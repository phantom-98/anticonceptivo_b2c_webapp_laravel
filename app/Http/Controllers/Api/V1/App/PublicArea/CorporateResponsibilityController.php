<?php

namespace App\Http\Controllers\Api\V1\App\PublicArea;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Willywes\ApiResponse\ApiResponse;
use App\Http\Utils\OutputMessage\OutputMessage;
use App\Models\LegalBase;

class CorporateResponsibilityController extends Controller
{
    public function index()
    {
        try {
            $legalBases = LegalBase::where('active',true)->get();
            $privacyPolicy = PrivacyPolicy::where('active',true)->get();

            return ApiResponse::JsonSuccess([
                'legal_bases' => $legalBases,
                'privacy_policy' => $privacyPolicy
            ]);

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }
}
