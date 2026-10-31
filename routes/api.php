<?php

use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\Api\AnalyticsController;
use App\Http\Controllers\Api\CertificateController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\EducationController;
use App\Http\Controllers\Api\ExperienceController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\SkillController;
use App\Http\Controllers\Api\TechnologyController;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

foreach (['project', 'experience', 'certificate', 'education', 'technology'] as $parameter) {
    Route::pattern($parameter, '[1-9][0-9]{0,17}');
}

// Public endpoints (PRD §10)
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{slug}', [ProjectController::class, 'show'])->name('api.projects.show');
Route::get('/experiences', [ExperienceController::class, 'index']);
Route::get('/experiences/{experience}', [ExperienceController::class, 'show']);
Route::get('/skills', [SkillController::class, 'index']);
Route::get('/educations', [EducationController::class, 'index']);
Route::get('/educations/{education}', [EducationController::class, 'show']);
Route::get('/certificates', [CertificateController::class, 'index']);
Route::get('/certificates/{certificate}', [CertificateController::class, 'show']);
Route::post('/contact', [ContactController::class, 'store'])->middleware('throttle:10,1')->withoutMiddleware(EnsureFrontendRequestsAreStateful::class);
Route::post('/analytics/view', [AnalyticsController::class, 'store'])->withoutMiddleware(EnsureFrontendRequestsAreStateful::class);

// Protected endpoints (Sanctum)
Route::middleware(['auth:sanctum', 'can:manage-content'])->group(function () {
    Route::get('/me', [AdminAuthController::class, 'me']);

    Route::post('/projects', [ProjectController::class, 'store']);
    Route::put('/projects/{project}', [ProjectController::class, 'update']);
    Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);

    Route::post('/experiences', [ExperienceController::class, 'store']);
    Route::put('/experiences/{experience}', [ExperienceController::class, 'update']);
    Route::delete('/experiences/{experience}', [ExperienceController::class, 'destroy']);

    Route::apiResource('certificates', CertificateController::class)->only(['store', 'update', 'destroy']);
    Route::apiResource('educations', EducationController::class)->only(['store', 'update', 'destroy']);
    Route::apiResource('technologies', TechnologyController::class);

    Route::get('/analytics/stats', [AnalyticsController::class, 'stats']);
});
