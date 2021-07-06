<?php


namespace App\Http\Controllers\Api\V1\App\PublicArea;


use App\Http\Controllers\Controller;
use App\Models\ContactIssue;
use Illuminate\Http\Request;
use Willywes\ApiResponse\ApiResponse;

class ContactController extends Controller
{
    public function getResources(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            $contact_issues = ContactIssue::whereNull('campaign_id')->with('fields_subject.children')->get();
            return ApiResponse::JsonSuccess([
                'contact_issues' => $contact_issues,
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
