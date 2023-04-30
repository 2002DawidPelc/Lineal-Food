<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// ALIMENTS
Route::group(['prefix' => 'aliments'], function () {
    Route::get('', 'App\Http\Controllers\AlimentController@index');
    Route::get('{aliment_id}', 'App\Http\Controllers\AlimentController@show');
});

// USUARIS
Route::group(['prefix' => 'usuaris'], function () {
    Route::get('', 'App\Http\Controllers\UsuariController@index');
});

// TIPUS
Route::group(['prefix' => 'tipus'], function () {
    Route::get('', 'App\Http\Controllers\TipusController@index');
});

// RECEPTES
Route::group(['prefix' => 'receptes'], function () {
    Route::get('', 'App\Http\Controllers\ReceptaController@index');
});

// DIARIS
Route::group(['prefix' => 'diaris'], function () {
    Route::get('', 'App\Http\Controllers\DiariController@index');
});

// ALIMENTS_DIARIS
Route::group(['prefix' => 'aliment_diari'], function () {
    Route::get('', 'App\Http\Controllers\Aliment_DiariController@index');
    Route::get('/{diari_id}/{data}', 'App\Http\Controllers\Aliment_DiariController@diari_usuari_dia');
});

// INGREDIENTS_RECEPTES
    Route::group(['prefix' => 'ingredient_recepta'], function () {
    Route::get('', 'App\Http\Controllers\Ingredient_ReceptaController@index');
});

// DIARIS
Route::group(['prefix' => 'preferits'], function () {
    Route::get('', 'App\Http\Controllers\PreferitController@index');
});
