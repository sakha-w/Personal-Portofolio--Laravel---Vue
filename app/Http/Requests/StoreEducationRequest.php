<?php

namespace App\Http\Requests;

class StoreEducationRequest extends ContentRequest
{
    public function rules(): array
    {
        return [
            'degree' => ['required', 'string', 'max:255'],
            'institution' => ['required', 'string', 'max:255'],
            'location' => $this->text(),
            'period' => $this->text(),
            'gpa' => $this->text(),
            'thesis' => $this->text(20000),
            'description' => $this->text(20000),
        ];
    }
}
