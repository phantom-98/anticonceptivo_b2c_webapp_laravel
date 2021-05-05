<?php

namespace App\Http\Controllers\Intranet;

use App\Models\Brand;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class BrandController extends GlobalController
{
    protected $options = [
        'route' => 'intranet.brands.',
        'folder' => 'intranet.brands.',
        'pluralName' => 'Categorías',
        'singularName' => 'Categoría',
        'disableActions' => ['show', 'changeStatus'],
        'enableActions' => ['position']

    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }
}