<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('users', App\Http\Controllers\UserController::class)
        ->names('user');
});

Route::prefix('auth')->group(function () {
    Route::post('login', [App\Http\Controllers\AuthController::class, 'login'])
        ->name('auth.login');

    Route::post('logout', [App\Http\Controllers\AuthController::class, 'logout'])
        ->name('auth.logout')
        ->middleware('auth:sanctum');
});