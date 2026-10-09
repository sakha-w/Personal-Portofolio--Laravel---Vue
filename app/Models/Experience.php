<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Experience extends Model
{
    protected $fillable = [
        'company',
        'position',
        'location',
        'start_date',
        'end_date',
        'description',
        'featured',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'featured' => 'boolean',
    ];

    public function technologies(): BelongsToMany
    {
        return $this->belongsToMany(Technology::class, 'experience_technologies');
    }
}
