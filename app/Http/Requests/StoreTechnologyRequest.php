<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;

class StoreTechnologyRequest extends ContentRequest
{
    protected ?string $slugSource = 'name';

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255', Rule::unique('technologies')->ignore($this->route('technology'))],
            'slug' => ['required', 'string', 'max:255', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/', Rule::unique('technologies')->ignore($this->route('technology'))],
            'category' => ['required', Rule::in(['frontend', 'backend', 'data', 'tools', 'other'])],
        ];
    }
}
