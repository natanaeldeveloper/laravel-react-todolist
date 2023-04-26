<?php

namespace App\Http\Controllers;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials, $request->remember)) {
            throw new AuthenticationException('Credenciais inválidas!');
        }

        $token = $request->user()->createToken($request->header('User-Agent'));

        return response()
            ->json(['message' => 'Autenticação bem sucedida!'], 200)
            ->header('Authorization', 'Bearer ' . $token->plainTextToken);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Desconectado com sucesso!'
        ]);
    }
}
