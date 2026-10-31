<?php

use App\Http\Controllers\AdminAuthController;
use Illuminate\Support\Facades\Route;

// Stateful JSON endpoints. Astro serves every browser page.
Route::post('/auth/login', [AdminAuthController::class, 'login'])->middleware('throttle:5,1');
Route::post('/auth/logout', [AdminAuthController::class, 'logout'])->middleware('auth:web');
