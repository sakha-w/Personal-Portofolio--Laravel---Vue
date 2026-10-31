<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Project extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'short_description',
        'description',
        'thumbnail',
        'year',
        'category',
        'featured',
        'github_url',
        'demo_url',
        'show_source_link',
        'show_project_link',
        'architecture',
        'challenge',
        'solution',
        'result',
    ];

    protected $casts = [
        'featured' => 'boolean',
        'show_source_link' => 'boolean',
        'show_project_link' => 'boolean',
        'image' => 'array',
    ];

    public function technologies(): BelongsToMany
    {
        return $this->belongsToMany(Technology::class, 'project_technologies');
    }
}
