<?php

namespace App\Http\Controllers\Api;

use App\ContentWriter;
use App\Http\Controllers\Controller;
use App\Http\Requests\ContentIndexRequest;
use App\Http\Requests\StoreCertificateRequest;
use App\Http\Resources\CertificateResource;
use App\Models\Certificate;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;

class CertificateController extends Controller
{
    public function __construct(private ContentWriter $writer) {}

    public function index(ContentIndexRequest $request): AnonymousResourceCollection
    {
        $query = Certificate::orderByRaw('year DESC NULLS LAST')->orderByDesc('id');
        if ($request->filled('q')) {
            $query->whereLike('title', $request->searchPattern());
        }

        return CertificateResource::collection($query->paginate($request->perPage())->withQueryString());
    }

    public function show(Certificate $certificate): CertificateResource
    {
        return new CertificateResource($certificate);
    }

    public function store(StoreCertificateRequest $request): JsonResponse
    {
        return (new CertificateResource($this->writer->save(new Certificate, $request->validated())))->response()->setStatusCode(201);
    }

    public function update(StoreCertificateRequest $request, Certificate $certificate): CertificateResource
    {
        return new CertificateResource($this->writer->save($certificate, $request->validated()));
    }

    public function destroy(Certificate $certificate): Response
    {
        $this->writer->delete($certificate);

        return response()->noContent();
    }
}
