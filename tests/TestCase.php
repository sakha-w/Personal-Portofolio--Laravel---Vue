<?php

namespace Tests;

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use LogicException;

abstract class TestCase extends BaseTestCase
{
    public function createApplication(): Application
    {
        $app = parent::createApplication();
        $connection = $app->make('db')->connection();
        if (! $app->environment('testing') || $connection->getDriverName() !== 'pgsql'
            || $connection->getDatabaseName() !== 'portfolio_test'
            || $connection->selectOne('select current_database() as name')->name !== 'portfolio_test') {
            throw new LogicException('Tests may only reset the isolated portfolio_test database.');
        }

        return $app;
    }
}
