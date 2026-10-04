<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreExperienceRequest;
use App\Http\Resources\ExperienceResource;
use App\Models\Experience;

class ExperienceController extends Controller
{
    /**
     * Display a listing of experiences.
     */
    public function index()
    {
        $experiences = Experience::with('technologies')
            ->orderByDesc('start_date')
            ->get();

        return ExperienceResource::collection($experiences);
    }

    /**
     * Display the specified experience.
     */
    public function show(Experience $experience)
    {
        return new ExperienceResource($experience->load('technologies'));
    }

    /**
     * Store a newly created experience.
     */
    public function store(StoreExperienceRequest $request)
    {
        $data = $request->validated();
        $technologyIds = $data['technology_ids'] ?? [];
        unset($data['technology_ids']);

        $experience = Experience::create($data);
        $experience->technologies()->sync($technologyIds);

        return (new ExperienceResource($experience->load('technologies')))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Update the specified experience.
     */
    public function update(StoreExperienceRequest $request, Experience $experience)
    {
        $data = $request->validated();
        $technologyIds = $data['technology_ids'] ?? null;
        unset($data['technology_ids']);

        $experience->update($data);

        if ($technologyIds !== null) {
            $experience->technologies()->sync($technologyIds);
        }

        return new ExperienceResource($experience->load('technologies'));
    }

    /**
     * Remove the specified experience.
     */
    public function destroy(Experience $experience)
    {
        $experience->delete();

        return response()->json(null, 204);
    }
}
