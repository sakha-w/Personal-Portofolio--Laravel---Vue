<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;

class StoreProjectRequest extends ContentRequest
{
    protected ?string $slugSource = 'title';

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/', Rule::unique('projects')->ignore($this->route('project'))],
            'short_description' => $this->text(500),
            'description' => $this->text(20000),
            'year' => $this->text(16),
            'category' => [$this->isMethod('POST') ? 'sometimes' : 'required', 'string', 'max:100'],
            'github_url' => [...$this->text(2048), 'url:http,https'],
            'demo_url' => [...$this->text(2048), 'url:http,https'],
            'architecture' => $this->text(20000),
            'challenge' => $this->text(20000),
            'solution' => $this->text(20000),
            'result' => $this->text(20000),
            ...$this->selections(),
            ...$this->singleImageRules(),
        ];
    }
}
