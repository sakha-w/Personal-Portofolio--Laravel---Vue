<?php

namespace App\Http\Controllers\Api;

use App\ContentWriter;
use App\Http\Controllers\Controller;
use App\Http\Requests\ContentIndexRequest;
use App\Http\Requests\StoreEducationRequest;
use App\Models\Education;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;

class EducationController extends Controller
{
    public function __construct(private ContentWriter $writer) {}

    public function index(ContentIndexRequest $request): AnonymousResourceCollection
    {
        $query = Education::orderByDesc('id');
        if ($request->filled('q')) {
            $query->where(fn ($query) => $query->whereLike('institution', $request->searchPattern())->orWhereLike('degree', $request->searchPattern()));
        }

        return JsonResource::collection($query->paginate($request->perPage())->withQueryString());
    }

    public function show(Education $education): JsonResource
    {
        return new JsonResource($education);
    }

    public function store(StoreEducationRequest $request): JsonResponse
    {
        return (new JsonResource($this->writer->save(new Education, $request->validated())))->response()->setStatusCode(201);
    }

    public function update(StoreEducationRequest $request, Education $education): JsonResource
    {
        return new JsonResource($this->writer->save($education, $request->validated()));
    }

    public function destroy(Education $education): Response
    {
        $this->writer->delete($education);

        return response()->noContent();
    }
}
