<?php

namespace App\Http\Requests;

class StoreExperienceRequest extends ContentRequest
{
    public function rules(): array
    {
        return [
            'company' => ['required', 'string', 'max:255'],
            'position' => ['required', 'string', 'max:255'],
            'location' => $this->text(),
            'start_date' => [...$this->text(10), 'date_format:Y-m-d'],
            'end_date' => [...$this->text(10), 'date_format:Y-m-d', ...($this->filled('start_date') ? ['after_or_equal:start_date'] : [])],
            'description' => $this->text(20000),
            ...$this->selections(),
            'evidence_images' => ['sometimes', 'array', 'list', 'max:3'],
            'evidence_images.*' => ['array:id,upload_index,alt'],
            'evidence_images.*.id' => ['sometimes', 'required', 'string', 'max:64', 'distinct'],
            'evidence_images.*.upload_index' => ['sometimes', 'required', 'integer', 'min:0', 'max:2', 'distinct'],
            'evidence_images.*.alt' => ['required', 'string', 'max:255'],
            'evidence_files' => ['sometimes', 'array', 'max:3'],
            'evidence_files.*' => $this->imageRules(),
        ];
    }
}
