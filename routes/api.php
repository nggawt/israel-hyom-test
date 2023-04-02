<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WriterController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\LocationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/




//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//return $request->user();
//});

//Route::post('/register', [AuthController::class, 'register']);
//Route::post('/login', [AuthController::class, 'login']);
//Route::get('/refresh', [AuthController::class, 'refreshToken']);

Route::group(['middleware' => 'api'], function () {
    //Route::middleware('auth:api')->group(function () {
    Route::apiResource('users', UserController::class);
    Route::apiResource('locs', LocationController::class);
    Route::apiResource('writers', WriterController::class);
    Route::apiResource('posts', PostController::class);
    //});
});

Route::post('register', [AuthController::class, 'register']);

Route::group([

  'middleware' => 'api',
  //'prefix' => 'auth'

], function ($router) {
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('me', [AuthController::class, 'me']);
});
