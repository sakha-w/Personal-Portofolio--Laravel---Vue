<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Education;

class EducationController extends Controller
{
    /**
     * Display a listing of educations.
     */
    public function index()
    {
        return response()->json([
            'data' => Education::orderByDesc('id')->get(),
        ]);
    }
}
