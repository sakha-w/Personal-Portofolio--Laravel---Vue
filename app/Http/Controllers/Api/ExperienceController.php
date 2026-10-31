<?php

namespace App\Http\Controllers\Api;

use App\ContentWriter;
use App\Http\Controllers\Controller;
use App\Http\Requests\ContentIndexRequest;
use App\Http\Requests\StoreExperienceRequest;
use App\Http\Resources\ExperienceResource;
use App\Models\Experience;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;

class ExperienceController extends Controller
{
    public function __construct(private ContentWriter $writer) {}

    public function index(ContentIndexRequest $request): AnonymousResourceCollection
    {
        $query = Experience::with('technologies:id,name,slug')->orderByRaw('start_date DESC NULLS LAST')->orderByDesc('id');
        if ($request->filled('q')) {
            $query->where(fn ($query) => $query->whereLike('company', $request->searchPattern())->orWhereLike('position', $request->searchPattern()));
        }

        return ExperienceResource::collection($query->paginate($request->perPage())->withQueryString());
    }

    public function show(Experience $experience): ExperienceResource
    {
        return new ExperienceResource($experience->load('technologies'));
    }

    public function store(StoreExperienceRequest $request): JsonResponse
    {
        $experience = $this->writer->save(new Experience, $request->validated());

        return (new ExperienceResource($experience->load('technologies')))->response()->setStatusCode(201);
    }

    public function update(StoreExperienceRequest $request, Experience $experience): ExperienceResource
    {
        $experience = $this->writer->save($experience, $request->validated());

        return new ExperienceResource($experience->load('technologies'));
    }

    public function destroy(Experience $experience): Response
    {
        $this->writer->delete($experience);

        return response()->noContent();
    }
}
