<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:projects,slug'],
            'short_description' => ['nullable', 'string', 'max:500'],
            'description' => ['nullable', 'string'],
            'thumbnail' => ['nullable', 'string', 'max:2048'],
            'year' => ['nullable', 'string', 'max:16'],
            'category' => ['nullable', 'string', 'max:100'],
            'featured' => ['nullable', 'boolean'],
            'github_url' => ['nullable', 'url', 'max:2048'],
            'demo_url' => ['nullable', 'url', 'max:2048'],
            'architecture' => ['nullable', 'string'],
            'challenge' => ['nullable', 'string'],
            'solution' => ['nullable', 'string'],
            'result' => ['nullable', 'string'],
            'technology_ids' => ['nullable', 'array'],
            'technology_ids.*' => ['integer', 'exists:technologies,id'],
        ];
    }
}
