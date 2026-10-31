<?php

use App\Models\User;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Validator;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('portfolio:owner {email} {--name=Portfolio Owner}', function () {
    $data = [
        'email' => $this->argument('email'),
        'name' => $this->option('name'),
        'password' => $this->secret('Owner password (at least 12 characters)'),
    ];
    $validator = Validator::make($data, [
        'email' => ['required', 'email', 'max:255'],
        'name' => ['required', 'string', 'max:255'],
        'password' => ['required', 'string', 'min:12', 'max:255'],
    ]);
    if ($validator->fails()) {
        $this->error($validator->errors()->first());

        return 1;
    }

    $user = User::firstOrNew(['email' => $data['email']]);
    $user->forceFill([...$data, 'is_admin' => true])->save();
    $this->info('Owner account saved. Sign in at /admin/login.');

    return 0;
})->purpose('Create or update the portfolio owner with an interactively supplied password');
