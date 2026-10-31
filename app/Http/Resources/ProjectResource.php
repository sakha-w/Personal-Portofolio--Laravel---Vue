<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $isContentManager = $request->user()?->can('manage-content') ?? false;
        $isPrivateResponse = $isContentManager || ! $request->isMethod('GET');
        $detail = $request->routeIs('api.projects.show') || $isPrivateResponse;

        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'short_description' => $this->short_description,
            'description' => $this->when($detail, fn () => $this->description),
            'thumbnail' => $this->image ? Storage::disk('public')->url($this->image['path']) : $this->thumbnail,
            'image' => $this->image ? new ImageResource($this->image) : null,
            'year' => $this->year,
            'category' => $this->category,
            'featured' => (bool) $this->featured,
            'github_url' => $this->when($detail, fn () => ($isPrivateResponse || $this->show_source_link) ? $this->github_url : null),
            'demo_url' => $this->when($detail, fn () => ($isPrivateResponse || $this->show_project_link) ? $this->demo_url : null),
            'show_source_link' => $this->when($detail, fn () => (bool) $this->show_source_link),
            'show_project_link' => $this->when($detail, fn () => (bool) $this->show_project_link),
            'architecture' => $this->when($detail, fn () => $this->architecture),
            'challenge' => $this->when($detail, fn () => $this->challenge),
            'solution' => $this->when($detail, fn () => $this->solution),
            'result' => $this->when($detail, fn () => $this->result),
            'technologies' => $this->whenLoaded('technologies', fn () => $this->technologies->map(fn ($tech) => [
                'id' => $tech->id,
                'name' => $tech->name,
                'slug' => $tech->slug,
            ])),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
