<?php

namespace App\Http\Controllers\Api;

use App\ContentWriter;
use App\Http\Controllers\Controller;
use App\Http\Requests\ContentIndexRequest;
use App\Http\Requests\StoreTechnologyRequest;
use App\Models\Technology;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;

class TechnologyController extends Controller
{
    public function __construct(private ContentWriter $writer) {}

    public function index(ContentIndexRequest $request): AnonymousResourceCollection
    {
        $query = Technology::orderBy('name')->orderBy('id');
        if ($request->filled('q')) {
            $query->whereLike('name', $request->searchPattern());
        }
        if ($request->filled('category')) {
            $query->where('category', $request->input('category'));
        }

        return JsonResource::collection($query->paginate($request->perPage())->withQueryString());
    }

    public function show(Technology $technology): JsonResource
    {
        return new JsonResource($technology);
    }

    public function store(StoreTechnologyRequest $request): JsonResponse
    {
        return (new JsonResource($this->writer->save(new Technology, $request->validated())))->response()->setStatusCode(201);
    }

    public function update(StoreTechnologyRequest $request, Technology $technology): JsonResource
    {
        return new JsonResource($this->writer->save($technology, $request->validated()));
    }

    public function destroy(Technology $technology): Response
    {
        $this->writer->delete($technology);

        return response()->noContent();
    }
}
