<?php

namespace App\Http\Controllers\Api\V1\App\PublicArea;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Willywes\ApiResponse\ApiResponse;
use App\Models\Category;
use App\Models\Page;
use App\Http\Utils\Enum\SectionTypes;

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

    public function getTermsAndConditions()
    {
        try {
            $sections = Page::where('active', true)->where('section', SectionTypes::TERMS_AND_CONDITIONS)->get();

            return ApiResponse::JsonSuccess(['sections' => $sections]);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }
}
