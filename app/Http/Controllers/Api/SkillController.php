<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Technology;

class SkillController extends Controller
{
    /**
     * Display skills grouped by category.
     */
    public function index()
    {
        $grouped = Technology::orderBy('name')
            ->get()
            ->groupBy('category')
            ->map(fn ($items) => $items->map(fn ($tech) => [
                'id' => $tech->id,
                'name' => $tech->name,
                'slug' => $tech->slug,
            ])->values());

        return response()->json(['data' => $grouped]);
    }
}
