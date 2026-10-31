<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use JsonException;
use stdClass;

class ContentRequest extends FormRequest
{
    protected ?string $slugSource = null;

    public function authorize(): bool
    {
        return $this->user()?->can('manage-content') ?? false;
    }

    protected function prepareForValidation(): void
    {
        if ($this->isJson()) {
            try {
                abort_unless(json_decode($this->getContent(), false, 32, JSON_THROW_ON_ERROR) instanceof stdClass, 400, 'Send a JSON object.');
            } catch (JsonException) {
                abort(400, 'The request contains invalid JSON.');
            }
        }

        if ($this->exists('data')) {
            try {
                $raw = $this->input('data');
                abort_unless(is_string($raw), 400, 'The data field must contain a JSON object.');
                abort_unless(json_decode($raw, false, 32, JSON_THROW_ON_ERROR) instanceof stdClass, 400, 'The data field must contain a JSON object.');
                $method = $this->getMethod();
                $this->replace(json_decode($raw, true, 32, JSON_THROW_ON_ERROR));
                $this->setMethod($method);
            } catch (JsonException) {
                abort(400, 'The data field contains invalid JSON.');
            }
        }

        if ($this->isMethod('POST') && $this->slugSource && ! $this->filled('slug') && is_string($this->input($this->slugSource))) {
            $this->merge(['slug' => Str::slug($this->input($this->slugSource))]);
        }
    }

    protected function text(int $max = 255): array
    {
        return [$this->isMethod('POST') ? 'sometimes' : 'present', 'nullable', 'string', "max:$max"];
    }

    protected function selections(): array
    {
        return [
            'featured' => [$this->isMethod('POST') ? 'sometimes' : 'required', 'boolean'],
            'technology_ids' => [$this->isMethod('POST') ? 'sometimes' : 'present', 'array', 'max:100'],
            'technology_ids.*' => ['integer', 'distinct', 'exists:technologies,id'],
        ];
    }

    protected function imageRules(): array
    {
        return ['file', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048', 'dimensions:max_width=8192,max_height=8192'];
    }

    protected function singleImageRules(): array
    {
        return [
            'image' => ['sometimes', ...$this->imageRules()],
            'image_alt' => ['required_with:image', 'string', 'max:255'],
            'remove_image' => ['sometimes', 'boolean'],
        ];
    }
}
