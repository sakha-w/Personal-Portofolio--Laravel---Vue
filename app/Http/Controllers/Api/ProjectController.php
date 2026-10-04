<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    /**
     * Display a listing of projects.
     */
    public function index(Request $request)
    {
        $query = Project::with('technologies')->latest();

        if ($category = $request->query('category')) {
            $query->where('category', $category);
        }

        if ($request->boolean('featured')) {
            $query->where('featured', true);
        }

        return ProjectResource::collection($query->paginate(12));
    }

    /**
     * Display the specified project by slug.
     */
    public function show(string $slug)
    {
        $project = Project::with('technologies')->where('slug', $slug)->firstOrFail();

        return new ProjectResource($project);
    }

    /**
     * Store a newly created project.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        $technologyIds = $data['technology_ids'] ?? [];
        unset($data['technology_ids']);

        $data['slug'] = $data['slug'] ?? Str::slug($data['title']);

        $project = Project::create($data);
        $project->technologies()->sync($technologyIds);

        return (new ProjectResource($project->load('technologies')))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Update the specified project.
     */
    public function update(StoreProjectRequest $request, Project $project)
    {
        $data = $request->validated();
        $technologyIds = $data['technology_ids'] ?? null;
        unset($data['technology_ids']);

        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['title'] ?? $project->title);
        }

        $project->update($data);

        if ($technologyIds !== null) {
            $project->technologies()->sync($technologyIds);
        }

        return new ProjectResource($project->load('technologies'));
    }

    /**
     * Remove the specified project.
     */
    public function destroy(Project $project)
    {
        $project->delete();

        return response()->json(null, 204);
    }
}
