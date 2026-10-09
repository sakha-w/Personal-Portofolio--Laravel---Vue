<?php

use App\Http\Controllers\Api\AnalyticsController;
use App\Http\Controllers\Api\CertificateController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\EducationController;
use App\Http\Controllers\Api\ExperienceController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\SkillController;
use Illuminate\Support\Facades\Route;

// Public endpoints (PRD §10)
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{slug}', [ProjectController::class, 'show']);
Route::get('/experiences', [ExperienceController::class, 'index']);
Route::get('/experiences/{experience}', [ExperienceController::class, 'show']);
Route::get('/skills', [SkillController::class, 'index']);
Route::get('/educations', [EducationController::class, 'index']);
Route::get('/certificates', [CertificateController::class, 'index']);
Route::post('/contact', [ContactController::class, 'store'])->middleware('throttle:10,1');
Route::post('/analytics/view', [AnalyticsController::class, 'store']);

// Protected endpoints (Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/projects', [ProjectController::class, 'store']);
    Route::put('/projects/{project}', [ProjectController::class, 'update']);
    Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);

    Route::post('/experiences', [ExperienceController::class, 'store']);
    Route::put('/experiences/{experience}', [ExperienceController::class, 'update']);
    Route::delete('/experiences/{experience}', [ExperienceController::class, 'destroy']);

    Route::get('/analytics/stats', [AnalyticsController::class, 'stats']);
});
