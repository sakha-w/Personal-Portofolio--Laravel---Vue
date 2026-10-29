<?php

namespace App\Http\Controllers\Api;

use App\ContentWriter;
use App\Http\Controllers\Controller;
use App\Http\Requests\ContentIndexRequest;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;

class ProjectController extends Controller
{
    public function __construct(private ContentWriter $writer) {}

    public function index(ContentIndexRequest $request): AnonymousResourceCollection
    {
        $query = Project::with('technologies:id,name,slug')
            ->select(['id', 'title', 'slug', 'short_description', 'thumbnail', 'image', 'year', 'category', 'featured', 'created_at', 'updated_at'])
            ->orderByDesc('created_at')->orderByDesc('id');
        if ($request->user()?->can('manage-content')) {
            $query->addSelect(['description', 'github_url', 'demo_url', 'show_source_link', 'show_project_link', 'architecture', 'challenge', 'solution', 'result']);
        }
        if ($request->filled('category')) {
            $query->where('category', $request->input('category'));
        }
        if ($request->has('featured')) {
            $query->where('featured', $request->boolean('featured'));
        }
        if ($request->filled('q')) {
            $query->whereLike('title', $request->searchPattern());
        }

        return ProjectResource::collection($query->paginate($request->perPage())->withQueryString())
            ->additional(['meta' => ['categories' => Project::distinct()->orderBy('category')->pluck('category')]]);
    }

    public function show(string $slug): ProjectResource
    {
        return new ProjectResource(Project::with('technologies')->where('slug', $slug)->firstOrFail());
    }

    public function store(StoreProjectRequest $request): JsonResponse
    {
        $project = $this->writer->save(new Project, $request->validated());

        return (new ProjectResource($project->load('technologies')))->response()->setStatusCode(201);
    }

    public function update(StoreProjectRequest $request, Project $project): ProjectResource
    {
        $project = $this->writer->save($project, $request->validated());

        return new ProjectResource($project->load('technologies'));
    }

    public function destroy(Project $project): Response
    {
        $this->writer->delete($project);

        return response()->noContent();
    }
}
