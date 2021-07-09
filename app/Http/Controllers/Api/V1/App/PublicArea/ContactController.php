<?php


namespace App\Http\Controllers\Api\V1\App\PublicArea;


use App\Http\Controllers\Controller;
use App\Models\ContactIssue;
use App\Models\NestedField;
use Illuminate\Http\Request;
use Willywes\ApiResponse\ApiResponse;

class ContactController extends Controller
{
    public function getResources(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            $nested_fields = NestedField::with(['nested_field_questions', 'children'])->whereNull('parent_id')->get();
            return ApiResponse::JsonSuccess([
                'nested_fields' => $nested_fields,
                'list' => NestedField::with(['nested_field_questions', 'children'])->get()
            ]);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError([]);
        }
    }

    public function send(Request $request): \Illuminate\Http\JsonResponse
    {
        try {

            return ApiResponse::JsonSuccess([

            ]);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError([]);
        }
    }
}
