<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::orderBy('name')->get();

        return response()->json([
            'data' => $users,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return response()->json([
            'data' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->only('name', 'email', 'password');
        $user->update($data);

        return response()->json([
            'message' => 'Recurso atualizado com sucesso!',
            'data' => $user,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        if(Auth::user()->id !== $user->id) {
            throw new AuthorizationException('Você não tem permissão para realizar esta operação!');
        }

        $user->delete();

        return response()->json([
            'message' => 'Recurso removido com sucesso!',
            'id' => $user->id,
        ], 200);
    }
}
