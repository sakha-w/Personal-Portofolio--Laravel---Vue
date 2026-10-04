<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Certificate;

class CertificateController extends Controller
{
    /**
     * Display a listing of certificates.
     */
    public function index()
    {
        return response()->json([
            'data' => Certificate::orderByDesc('year')->orderByDesc('id')->get(),
        ]);
    }
}
