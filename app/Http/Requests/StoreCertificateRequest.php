<?php

namespace App\Http\Requests;

class StoreCertificateRequest extends ContentRequest
{
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'issuer' => ['required', 'string', 'max:255'],
            'year' => $this->text(16),
            'description' => $this->text(20000),
            'credential_url' => [...$this->text(2048), 'url:http,https'],
            ...$this->singleImageRules(),
        ];
    }
}
