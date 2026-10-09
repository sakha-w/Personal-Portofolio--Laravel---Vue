<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactRequest;
use App\Models\Message;

class ContactController extends Controller
{
    /**
     * Store a contact message.
     */
    public function store(StoreContactRequest $request)
    {
        Message::create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Your message has been sent successfully.',
        ], 201);
    }
}
