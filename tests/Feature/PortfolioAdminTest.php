<?php

namespace Tests\Feature;

use App\Models\Experience;
use App\Models\Project;
use App\Models\User;
use Database\Seeders\BrowserTestSeeder;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use LogicException;
use Mockery;
use RuntimeException;
use Tests\TestCase;

class PortfolioAdminTest extends TestCase
{
    use DatabaseMigrations;

    private User $owner;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('public');
        $this->owner = User::factory()->create(['is_admin' => true]);
    }

    private function project(array $overrides = []): array
    {
        return [...[
            'title' => 'Portfolio', 'slug' => 'portfolio', 'short_description' => null,
            'description' => 'Case study', 'year' => '2026', 'category' => 'Web Development',
            'featured' => false, 'github_url' => null, 'demo_url' => null,
            'architecture' => null, 'challenge' => null, 'solution' => null, 'result' => null,
            'technology_ids' => [],
        ], ...$overrides];
    }

    private function experience(array $overrides = []): array
    {
        return [...[
            'company' => 'Example Studio', 'position' => 'Developer', 'location' => null,
            'start_date' => '2025-01-01', 'end_date' => null, 'description' => 'Built an application.',
            'featured' => false, 'technology_ids' => [],
        ], ...$overrides];
    }

    private function image(int $width = 1): UploadedFile
    {
        $chunk = fn (string $type, string $data): string => pack('N', strlen($data)).$type.$data.pack('N', crc32($type.$data));

        return UploadedFile::fake()->createWithContent('evidence.png', "\x89PNG\r\n\x1a\n"
            .$chunk('IHDR', pack('NNC5', $width, 1, 8, 2, 0, 0, 0))
            .$chunk('IDAT', gzcompress(str_repeat("\0", $width * 3 + 1)))
            .$chunk('IEND', ''));
    }

    public function test_every_content_mutation_requires_owner_authorization(): void
    {
        foreach (['projects', 'experiences', 'certificates', 'educations', 'technologies'] as $resource) {
            $this->postJson("/api/$resource", [])->assertUnauthorized();
        }
        $this->actingAs(User::factory()->create());
        foreach (['projects', 'experiences', 'certificates', 'educations', 'technologies'] as $resource) {
            $this->postJson("/api/$resource", [])->assertForbidden();
        }
        $this->getJson('/api/technologies')->assertForbidden();
        $this->getJson('/api/me')->assertForbidden();
    }

    public function test_owner_login_logout_and_failed_login(): void
    {
        $this->getJson('/api/me')->assertUnauthorized();
        $this->postJson('/auth/login', ['email' => $this->owner->email, 'password' => 'incorrect'])->assertUnprocessable()->assertJsonValidationErrors('email');
        $this->postJson('/auth/login', ['email' => $this->owner->email, 'password' => 'password'])->assertOk()->assertJsonPath('data.id', $this->owner->id);
        $this->getJson('/api/technologies')->assertOk();
        $this->getJson('/api/me')->assertOk()->assertExactJson(['data' => $this->owner->only('id', 'name', 'email')])
            ->assertHeader('Cache-Control', 'no-store, private');
        $this->postJson('/auth/logout')->assertNoContent();
        Auth::forgetGuards();
        Auth::shouldUse('web');
        $this->postJson('/api/projects', $this->project())->assertUnauthorized();
        $this->getJson('/api/me')->assertUnauthorized();

        $user = User::factory()->create();
        $this->postJson('/auth/login', ['email' => $user->email, 'password' => 'password'])->assertUnprocessable();
    }

    public function test_login_is_throttled(): void
    {
        for ($attempt = 0; $attempt < 5; $attempt++) {
            $this->postJson('/auth/login', ['email' => $this->owner->email, 'password' => 'wrong'])->assertUnprocessable();
        }
        $this->postJson('/auth/login', ['email' => $this->owner->email, 'password' => 'wrong'])->assertTooManyRequests();
    }

    public function test_browser_fixture_guard_runs_before_resetting_the_database(): void
    {
        $this->app->instance('env', 'local');
        try {
            Artisan::call('db:seed', ['--class' => BrowserTestSeeder::class, '--force' => true]);
            $this->fail('The browser fixture should reject non-test execution.');
        } catch (LogicException $exception) {
            $this->assertStringContainsString('isolated portfolio_test', $exception->getMessage());
        } finally {
            $this->app->instance('env', 'testing');
        }
        $this->assertDatabaseHas('users', ['id' => $this->owner->id, 'email' => $this->owner->email]);
    }

    public function test_invalid_record_identifiers_are_rejected_before_database_lookup(): void
    {
        $this->actingAs($this->owner);
        foreach (['projects', 'experiences', 'certificates', 'educations', 'technologies'] as $resource) {
            foreach (['invalid', '999999999999999999999999'] as $id) {
                $this->getJson("/api/$resource/$id")->assertNotFound();
                // A project slug is a valid GET route, but cannot be used for mutations.
                $status = $resource === 'projects' ? 405 : 404;
                $this->putJson("/api/$resource/$id", [])->assertStatus($status);
                $this->deleteJson("/api/$resource/$id")->assertStatus($status);
            }
        }
    }

    public function test_existing_records_cannot_be_updated_or_deleted_by_non_owners(): void
    {
        $this->actingAs($this->owner);
        $records = [];
        foreach ([
            'projects' => $this->project(),
            'experiences' => $this->experience(),
            'certificates' => ['title' => 'Certificate', 'issuer' => 'Issuer'],
            'educations' => ['degree' => 'Degree', 'institution' => 'University'],
            'technologies' => ['name' => 'Vue', 'category' => 'frontend'],
        ] as $resource => $data) {
            $records[$resource] = $this->postJson("/api/$resource", $data)->assertCreated()->json('data.id');
        }
        Auth::forgetGuards();
        $this->actingAs(User::factory()->create(), 'web');
        foreach ($records as $resource => $id) {
            $this->putJson("/api/$resource/$id", [])->assertForbidden();
            $this->deleteJson("/api/$resource/$id")->assertForbidden();
        }
        Auth::guard('web')->logout();
        Auth::forgetGuards();
        Auth::shouldUse('web');
        foreach ($records as $resource => $id) {
            $this->putJson("/api/$resource/$id", [])->assertUnauthorized();
            $this->deleteJson("/api/$resource/$id")->assertUnauthorized();
        }
    }

    public function test_all_five_collections_support_create_read_update_and_delete(): void
    {
        $this->actingAs($this->owner);
        $cases = [
            ['projects', $this->project(), 'title'],
            ['experiences', $this->experience(), 'company'],
            ['certificates', ['title' => 'Certificate', 'issuer' => 'Issuer', 'year' => '2026', 'description' => null, 'credential_url' => null], 'title'],
            ['educations', ['degree' => 'BSc', 'institution' => 'University', 'location' => null, 'period' => '2020–2024', 'gpa' => null, 'thesis' => null, 'description' => null], 'degree'],
            ['technologies', ['name' => 'Vue', 'slug' => 'vue', 'category' => 'frontend'], 'name'],
        ];
        foreach ($cases as [$resource, $data, $field]) {
            $record = $this->postJson("/api/$resource", $data)->assertCreated()->json('data');
            $key = $resource === 'projects' ? $record['slug'] : $record['id'];
            $this->getJson("/api/$resource/$key")->assertOk()->assertJsonPath('data.id', $record['id']);
            $this->putJson("/api/$resource/{$record['id']}", [...$data, $field => 'Updated'])->assertOk()->assertJsonPath("data.$field", 'Updated');
            $this->getJson("/api/$resource")->assertOk()->assertJsonPath('meta.total', 1);
            $this->deleteJson("/api/$resource/{$record['id']}")->assertNoContent();
            $this->getJson("/api/$resource/$key")->assertNotFound();
        }
    }

    public function test_project_slugs_limits_links_and_relationship_clearing(): void
    {
        $this->actingAs($this->owner);
        $technology = $this->postJson('/api/technologies', ['name' => 'Vue', 'category' => 'frontend'])->assertCreated()->json('data');
        $data = $this->project(['technology_ids' => [$technology['id']], 'short_description' => str_repeat('a', 500), 'github_url' => 'https://example.com/'.str_repeat('a', 1000)]);
        $project = $this->postJson('/api/projects', $data)->assertCreated()->json('data');
        $this->postJson('/api/projects', $data)->assertUnprocessable()->assertJsonValidationErrors('slug');
        $this->putJson("/api/projects/{$project['id']}", [...$data, 'technology_ids' => []])->assertOk()->assertJsonPath('data.slug', 'portfolio')->assertJsonCount(0, 'data.technologies');
        $this->putJson("/api/projects/{$project['id']}", ['title' => 'Incomplete'])->assertUnprocessable()->assertJsonValidationErrors(['slug', 'technology_ids']);
        $this->putJson("/api/projects/{$project['id']}", [...$data, 'demo_url' => 'javascript:alert(1)'])->assertUnprocessable()->assertJsonValidationErrors('demo_url');
        $this->postJson('/api/projects', $this->project(['title' => 'Generated slug', 'slug' => null]))->assertCreated()->assertJsonPath('data.slug', 'generated-slug');
        $this->postJson('/api/experiences', $this->experience(['end_date' => '2024-12-31']))->assertUnprocessable()->assertJsonValidationErrors('end_date');
    }

    public function test_image_upload_preserve_replace_remove_and_delete(): void
    {
        $this->actingAs($this->owner);
        $data = $this->project(['image_alt' => 'Project preview']);
        $project = $this->post('/api/projects', ['data' => json_encode($data), 'image' => $this->image()], ['Accept' => 'application/json'])->assertCreated()->json('data');
        $original = Project::findOrFail($project['id'])->image['path'];
        Storage::disk('public')->assertExists($original);
        $this->assertArrayNotHasKey('path', $project['image']);
        $this->putJson("/api/projects/{$project['id']}", $this->project())->assertOk()->assertJsonPath('data.image.id', $project['image']['id']);
        $this->post("/api/projects/{$project['id']}", ['_method' => 'PUT', 'data' => json_encode($data), 'image' => $this->image()], ['Accept' => 'application/json'])->assertOk();
        Storage::disk('public')->assertMissing($original);
        $replacement = Project::findOrFail($project['id'])->image['path'];
        $this->putJson("/api/projects/{$project['id']}", $this->project(['remove_image' => true]))->assertOk()->assertJsonPath('data.image', null);
        Storage::disk('public')->assertMissing($replacement);

        $certificate = $this->post('/api/certificates', ['data' => json_encode(['title' => 'Certificate', 'issuer' => 'Issuer', 'image_alt' => 'Certificate scan']), 'image' => $this->image()], ['Accept' => 'application/json'])->assertCreated()->json('data');
        $this->deleteJson("/api/certificates/{$certificate['id']}")->assertNoContent();
        $this->assertCount(0, Storage::disk('public')->allFiles());
    }

    public function test_gallery_limit_counts_retained_images_and_allows_replacement_and_clearing(): void
    {
        $this->actingAs($this->owner);
        $entries = array_map(fn ($index) => ['upload_index' => $index, 'alt' => "Evidence $index"], range(0, 2));
        $record = $this->post('/api/experiences', [
            'data' => json_encode($this->experience(['evidence_images' => $entries])),
            'evidence_files' => [$this->image(), $this->image(), $this->image()],
        ], ['Accept' => 'application/json'])->assertCreated()->assertJsonCount(3, 'data.evidence_images')->json('data');
        $retained = array_map(fn ($image) => ['id' => $image['id'], 'alt' => $image['alt']], $record['evidence_images']);
        $this->post("/api/experiences/{$record['id']}", [
            '_method' => 'PUT', 'data' => json_encode($this->experience(['evidence_images' => [...$retained, ['upload_index' => 0, 'alt' => 'Fourth']]])),
            'evidence_files' => [$this->image()],
        ], ['Accept' => 'application/json'])->assertUnprocessable()->assertJsonValidationErrors('evidence_images');
        $this->assertCount(3, Storage::disk('public')->allFiles());
        $removed = Experience::findOrFail($record['id'])->evidence_images[2]['path'];
        $this->post("/api/experiences/{$record['id']}", [
            '_method' => 'PUT', 'data' => json_encode($this->experience(['evidence_images' => [$retained[0], $retained[1], ['upload_index' => 0, 'alt' => 'Replacement']]])),
            'evidence_files' => [$this->image()],
        ], ['Accept' => 'application/json'])->assertOk()->assertJsonCount(3, 'data.evidence_images');
        Storage::disk('public')->assertMissing($removed);
        $this->assertCount(3, Storage::disk('public')->allFiles());
        $this->putJson("/api/experiences/{$record['id']}", $this->experience(['evidence_images' => []]))->assertOk()->assertJsonCount(0, 'data.evidence_images');
        $this->assertCount(0, Storage::disk('public')->allFiles());
    }

    public function test_gallery_rejects_foreign_ids_and_unreferenced_files_without_saving(): void
    {
        $this->actingAs($this->owner);
        $record = $this->postJson('/api/experiences', $this->experience())->assertCreated()->json('data');
        $this->putJson("/api/experiences/{$record['id']}", $this->experience(['company' => 'Must not save', 'evidence_images' => [['id' => 'foreign', 'alt' => 'Wrong']]]))->assertUnprocessable()->assertJsonValidationErrors('evidence_images.0.id');
        $this->assertDatabaseHas('experiences', ['id' => $record['id'], 'company' => 'Example Studio']);
        $this->post('/api/experiences', [
            'data' => json_encode($this->experience(['evidence_images' => [['upload_index' => 0, 'alt' => 'Used']]])),
            'evidence_files' => [$this->image(), $this->image()],
        ], ['Accept' => 'application/json'])->assertUnprocessable();
        $this->assertCount(0, Storage::disk('public')->allFiles());
        $this->assertDatabaseCount('experiences', 1);
    }

    public function test_invalid_files_and_multipart_json_are_rejected(): void
    {
        $this->actingAs($this->owner);
        $this->post('/api/projects', ['data' => '[]'], ['Accept' => 'application/json'])->assertBadRequest();
        $this->post('/api/projects', ['data' => '{broken'], ['Accept' => 'application/json'])->assertBadRequest();
        $data = json_encode($this->project(['image_alt' => 'Preview']));
        $this->post('/api/projects', ['data' => $data, 'image' => UploadedFile::fake()->createWithContent('image.jpg', '<?php echo 1;')], ['Accept' => 'application/json'])->assertUnprocessable()->assertJsonValidationErrors('image');
        $this->post('/api/projects', ['data' => $data, 'image' => $this->image()->size(2049)], ['Accept' => 'application/json'])->assertUnprocessable()->assertJsonValidationErrors('image');
        $this->post('/api/projects', ['data' => $data, 'image' => $this->image(4097)], ['Accept' => 'application/json'])->assertUnprocessable()->assertJsonValidationErrors('image');
        $this->assertDatabaseCount('projects', 0);
        $this->assertCount(0, Storage::disk('public')->allFiles());
    }

    public function test_failed_database_save_preserves_old_image_and_cleans_new_upload(): void
    {
        $this->actingAs($this->owner);
        $data = $this->project(['image_alt' => 'Preview']);
        $record = $this->post('/api/projects', ['data' => json_encode($data), 'image' => $this->image()], ['Accept' => 'application/json'])->assertCreated()->json('data');
        $oldImage = Project::findOrFail($record['id'])->image;
        Project::updated(fn () => throw new RuntimeException('Simulated persistence failure'));
        try {
            $this->post("/api/projects/{$record['id']}", ['_method' => 'PUT', 'data' => json_encode($data), 'image' => $this->image()], ['Accept' => 'application/json'])->assertServerError();
        } finally {
            Project::flushEventListeners();
        }
        $this->assertSame($oldImage, Project::findOrFail($record['id'])->image);
        Storage::disk('public')->assertExists($oldImage['path']);
        $this->assertCount(1, Storage::disk('public')->allFiles());
    }

    public function test_failed_disk_write_preserves_existing_image(): void
    {
        $this->actingAs($this->owner);
        $data = $this->project(['image_alt' => 'Preview']);
        $record = $this->post('/api/projects', ['data' => json_encode($data), 'image' => $this->image()], ['Accept' => 'application/json'])->assertCreated()->json('data');
        $original = Project::findOrFail($record['id'])->image;
        $disk = Storage::disk('public');
        $failing = Mockery::mock($disk);
        $failing->shouldReceive('putFileAs')->once()->andReturn(false);
        Storage::shouldReceive('disk')->with('public')->andReturn($failing);
        $this->post("/api/projects/{$record['id']}", ['_method' => 'PUT', 'data' => json_encode($data), 'image' => $this->image()], ['Accept' => 'application/json'])->assertServerError();
        $this->assertSame($original, Project::findOrFail($record['id'])->image);
        $disk->assertExists($original['path']);
        $this->assertCount(1, $disk->allFiles());
    }

    public function test_public_pagination_filtering_and_lightweight_project_lists(): void
    {
        $this->actingAs($this->owner);
        for ($index = 0; $index < 14; $index++) {
            $this->postJson('/api/projects', $this->project(['slug' => "project-$index", 'category' => $index === 0 ? 'Rare' : 'Common', 'featured' => $index === 0]))->assertCreated();
        }
        Auth::guard('web')->logout();
        Auth::forgetGuards();
        Auth::shouldUse('web');
        $list = $this->getJson('/api/projects')->assertOk()->assertJsonCount(12, 'data')->assertJsonPath('meta.total', 14);
        $this->assertArrayNotHasKey('description', $list->json('data.0'));
        $this->assertContains('Rare', $list->json('meta.categories'));
        $this->getJson('/api/projects?page=2')->assertOk()->assertJsonCount(2, 'data');
        $this->getJson('/api/projects?category=Rare')->assertOk()->assertJsonCount(1, 'data');
        $this->getJson('/api/projects?featured=0')->assertOk()->assertJsonPath('meta.total', 13);
        $this->getJson('/api/projects/project-0')->assertOk()->assertJsonPath('data.description', 'Case study');
        $this->getJson('/api/projects?per_page=51')->assertUnprocessable();
    }
}
