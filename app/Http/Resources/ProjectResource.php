<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'short_description' => $this->short_description,
            'description' => $this->description,
            'thumbnail' => $this->thumbnail,
            'year' => $this->year,
            'category' => $this->category,
            'featured' => (bool) $this->featured,
            'github_url' => $this->github_url,
            'demo_url' => $this->demo_url,
            'architecture' => $this->architecture,
            'challenge' => $this->challenge,
            'solution' => $this->solution,
            'result' => $this->result,
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
