<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AdminAuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email', 'max:255'],
            'password' => ['required', 'string', 'max:1024'],
        ]);

        if (! Auth::guard('web')->attempt([...$credentials, 'is_admin' => true])) {
            throw ValidationException::withMessages(['email' => 'The supplied owner credentials are incorrect.']);
        }

        $request->session()->regenerate();

        return $this->me($request);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json(['data' => $request->user()->only('id', 'name', 'email')])
            ->header('Cache-Control', 'private, no-store');
    }

    public function logout(Request $request): Response
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->noContent()->header('Cache-Control', 'no-store');
    }
}
