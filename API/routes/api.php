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

// SESSIONS
Route::post('/login', 'App\Http\Controllers\UsuariController@login');
Route::post('/logout', 'App\Http\Controllers\UsuariController@logout');

// ALIMENTS
Route::group(['prefix' => 'aliments'], function () {
    Route::get('', 'App\Http\Controllers\AlimentController@index');
    Route::get('/solicituds', 'App\Http\Controllers\AlimentController@solicituds');
    Route::get('/norestaurant', 'App\Http\Controllers\AlimentController@norestaurant');
    Route::get('{aliment_id}', 'App\Http\Controllers\AlimentController@show');
    Route::post('', 'App\Http\Controllers\AlimentController@store');
    Route::post('pujarfotoindividual', 'App\Http\Controllers\AlimentController@pujarFotoIndividual');
    Route::put('{aliment_id}', 'App\Http\Controllers\AlimentController@update');
    Route::get('perMarcaRestaurant/{marca_restaurant}', 'App\Http\Controllers\AlimentController@alimentsPerMarcaRestaurant');
    Route::delete('{aliment_id}', 'App\Http\Controllers\AlimentController@delete');
});

// USUARIS
Route::group(['prefix' => 'usuaris'], function () {
    Route::get('', 'App\Http\Controllers\UsuariController@index');
    Route::get('{usuari_id}', 'App\Http\Controllers\UsuariController@show');
    Route::post('', 'App\Http\Controllers\UsuariController@store');
    Route::put('{usuari_id}', 'App\Http\Controllers\UsuariController@update');
});

// Objectiu i activitat física
Route::get('/activitat_fisica', 'App\Http\Controllers\Activitat_FisicaController@index');
Route::get('/objectiu', 'App\Http\Controllers\ObjectiuController@index');


// TIPUS
Route::group(['prefix' => 'tipus'], function () {
    Route::get('', 'App\Http\Controllers\TipusController@index');
});

// RECEPTES
Route::group(['prefix' => 'receptes'], function () {
    Route::get('', 'App\Http\Controllers\ReceptaController@index');
    Route::get('{usuari_id}', 'App\Http\Controllers\ReceptaController@receptes_usuari');
    Route::post('', 'App\Http\Controllers\ReceptaController@store');
    Route::delete('/{recepta_id}', 'App\Http\Controllers\ReceptaController@delete');
});
Route::get('/detalls', 'App\Http\Controllers\ReceptaController@detalls_recepta');

// DIARIS
Route::group(['prefix' => 'diaris'], function () {
    Route::get('', 'App\Http\Controllers\DiariController@index');
});

// ALIMENTS_DIARIS
Route::group(['prefix' => 'aliment_diari'], function () {
    Route::get('', 'App\Http\Controllers\Aliment_DiariController@index');
    Route::get('/{diari_id}/{data}', 'App\Http\Controllers\Aliment_DiariController@diari_usuari_dia');
    Route::post('', 'App\Http\Controllers\Aliment_DiariController@store');
    Route::delete('/{aliment_id}/{diari_id}/{menjar_del_dia}/{data_diari}', 'App\Http\Controllers\Aliment_DiariController@delete');
});

Route::get('/grafic/{diari_id}', 'App\Http\Controllers\Aliment_DiariController@diari_usuari');

// INGREDIENTS_RECEPTES
    Route::group(['prefix' => 'ingredient_recepta'], function () {
    Route::get('', 'App\Http\Controllers\Ingredient_ReceptaController@index');
    Route::delete('/{aliment_id}/{recepta_id}', 'App\Http\Controllers\Ingredient_ReceptaController@delete');
    Route::post('', 'App\Http\Controllers\Ingredient_ReceptaController@store');
});

// PREFERITS
Route::group(['prefix' => 'preferits'], function () {
    Route::get('', 'App\Http\Controllers\PreferitController@index');
    Route::post('', 'App\Http\Controllers\PreferitController@store');
    Route::delete('{usuari_id}/{aliment_id}', 'App\Http\Controllers\PreferitController@delete');
});
Route::get('preferitsUsuari/{usuari_id}', 'App\Http\Controllers\PreferitController@preferitsUsuari');

// MARCA_RESTAURANT
Route::group(['prefix' => 'marca_restaurant'], function () {
    Route::get('', 'App\Http\Controllers\Marca_RestaurantController@index');
});
