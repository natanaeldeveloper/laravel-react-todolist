<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if(Auth::attempt($credentials, $request->remember)) {

            $token = $request->user()->createToken('User Login');

            return response()->json([
                'auth' => 'Ok',
                'token' => $token->plainTextToken
            ]);
        }

        return response()->json([
            'auth' => 'Unauth'
        ]);
    }
}
