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
        'architecture',
        'challenge',
        'solution',
        'result',
    ];

    protected $casts = [
        'featured' => 'boolean',
    ];

    public function technologies(): BelongsToMany
    {
        return $this->belongsToMany(Technology::class, 'project_technologies');
    }
}
