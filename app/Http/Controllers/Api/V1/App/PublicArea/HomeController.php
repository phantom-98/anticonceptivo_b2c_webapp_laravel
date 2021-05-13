<?php

namespace App\Http\Controllers\Api\V1\App\PublicArea;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Willywes\ApiResponse\ApiResponse;

class HomeController extends Controller
{
    public function getCategories()
    {
        try {
            $categories = Category::with(['subcategories'])->get();

            return ApiResponse::JsonSuccess(['categories' => $categories]);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }
}
