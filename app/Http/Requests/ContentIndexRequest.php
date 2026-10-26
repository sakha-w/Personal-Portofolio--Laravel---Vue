<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContentIndexRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'page' => ['sometimes', 'integer', 'min:1'],
            'per_page' => ['sometimes', 'integer', 'min:1', 'max:50'],
            'category' => ['sometimes', 'string', 'max:100'],
            'featured' => ['sometimes', 'boolean'],
            'q' => ['sometimes', 'nullable', 'string', 'max:100'],
        ];
    }

    public function perPage(): int
    {
        return $this->integer('per_page', 12);
    }

    public function searchPattern(): string
    {
        // ponytail: contains-search suits this small catalogue; add a trigram index if measured search latency grows.
        return '%'.addcslashes((string) $this->input('q', ''), '\\%_').'%';
    }
}
