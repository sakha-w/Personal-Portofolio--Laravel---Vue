<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use LogicException;

class BrowserTestSeeder extends Seeder
{
    public function run(): void
    {
        if (! app()->environment('testing') || ! $this->command || ! getenv('BROWSER_OWNER_PASSWORD')) {
            throw new LogicException('Browser fixtures require the isolated portfolio_test database and an ephemeral password.');
        }
        $connection = DB::connection();
        if ($connection->getDriverName() !== 'pgsql' || $connection->getDatabaseName() !== 'portfolio_test'
            || $connection->selectOne('select current_database() as name')->name !== 'portfolio_test') {
            throw new LogicException('Browser fixtures may only reset portfolio_test.');
        }
        // Check the resolved connection before any destructive migration, including when config is cached.
        if ($this->command->call('migrate:fresh', ['--force' => true]) !== 0) {
            throw new LogicException('The isolated browser database could not be prepared.');
        }
        $this->call(PortfolioSeeder::class);
        (new User)->forceFill([
            'name' => 'Browser Owner',
            'email' => 'browser-owner@example.test',
            'password' => getenv('BROWSER_OWNER_PASSWORD'),
            'is_admin' => true,
        ])->save();
    }
}
