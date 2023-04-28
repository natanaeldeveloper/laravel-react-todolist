<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Helpers\Helper;

class AuthController extends Controller
{
    public function register(StoreUserRequest $request)
    {
        $data = $request->only('name', 'email', 'password');
        $user = User::create($data);

        $tokenName = Helper::formatUserAgent($request->header('User-Agent'));
        $token = $user->createToken($tokenName);

        return response()->json([
            'message' => 'Registro bem sucedido!',
            'token' => $token->plainTextToken,
            'data' => $user,
        ], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials, $request->remember)) {
            throw new AuthenticationException('Credenciais inválidas!');
        }

        $tokenName = Helper::formatUserAgent($request->header('User-Agent'));
        $token = $request->user()->createToken($tokenName);

        return response()
            ->json([
                'message' => 'Autenticação bem sucedida!',
                'token' => $token->plainTextToken
            ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Desconectado com sucesso!'
        ]);
    }
}
