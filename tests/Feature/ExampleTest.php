<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     */
    use RefreshDatabase;

    public function test_backend_health_and_retired_browser_routes(): void
    {
        $this->get('/up')->assertOk();
        foreach (['/', '/admin', '/admin/login', '/posts', '/posts/create'] as $path) {
            $this->get($path)->assertNotFound()->assertJsonStructure(['message']);
        }
        $this->postJson('/posts', ['title' => 'Retired', 'content' => 'Retired'])->assertNotFound();
        $this->assertTrue(Schema::hasTable('posts'));
    }
}
