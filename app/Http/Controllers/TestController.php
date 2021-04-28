<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TestController extends Controller
{
    public function index()
    {
        return [
            bcrypt(1),
            bcrypt(1),
            bcrypt(1),
            encrypt(3),
            encrypt(3),
            encrypt(3),
        ];

        return view('emails.base');
    }
}
