<?php

namespace Innovaweb\Transbank\Facades;

use Illuminate\Support\Facades\Facade;

class Transbank extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor(): string
    {
        return 'transbank';
    }
}
