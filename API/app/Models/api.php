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

// AJUDA

Route::get('/', function (){
    return response()->file(public_path('imatges')."/RECURSOS.pdf");
});

// MODALITATS

Route::group(['prefix' => 'modalitats', 'middleware'=>'controlatoken'], function () {
    Route::get('', 'App\Http\Controllers\ModalitatController@index');
    Route::get('{id}', 'App\Http\Controllers\ModalitatController@show');
    Route::post('', 'App\Http\Controllers\ModalitatController@store');
    Route::put('{id}', 'App\Http\Controllers\ModalitatController@update');
    Route::delete('{id}', 'App\Http\Controllers\ModalitatController@delete');
});

// SERVEIS

Route::group(['prefix' => 'serveis', 'middleware'=>'controlatoken'], function () {
    Route::get('', 'App\Http\Controllers\ServeiController@index');
    Route::get('{id}', 'App\Http\Controllers\ServeiController@show');
    Route::post('', 'App\Http\Controllers\ServeiController@store');
    Route::put('{id}', 'App\Http\Controllers\ServeiController@update');
    Route::delete('{id}', 'App\Http\Controllers\ServeiController@delete');
    Route::post('{id}/imatge', 'App\Http\Controllers\ServeiController@imatge');
});

// EXPOSICIONS

Route::group(['prefix' => 'exposicions', 'middleware'=>'controlatoken'], function () {
    Route::get('', 'App\Http\Controllers\ExposicioController@index');
    Route::get('{id}', 'App\Http\Controllers\ExposicioController@show');
    Route::post('', 'App\Http\Controllers\ExposicioController@store');
    Route::put('{id}', 'App\Http\Controllers\ExposicioController@update');
    Route::delete('{id}', 'App\Http\Controllers\ExposicioController@delete');
});

// ESPAIS EXPOSITIUS

Route::group(['prefix' => 'espais_expositius', 'middleware'=>'controlatoken'], function () {
    Route::get('', 'App\Http\Controllers\Espai_ExpositiuController@index');
    Route::get('{id}', 'App\Http\Controllers\Espai_ExpositiuController@show');
    Route::post('', 'App\Http\Controllers\Espai_ExpositiuController@store');
    Route::put('{id}', 'App\Http\Controllers\Espai_ExpositiuController@update');
    Route::delete('{id}', 'App\Http\Controllers\Espai_ExpositiuController@delete');
});

// USUARIS

Route::group(['prefix' => 'usuaris'], function () {
    Route::get('', 'App\Http\Controllers\UsuariController@index');
    Route::get('{id}', 'App\Http\Controllers\UsuariController@show');
    Route::post('', 'App\Http\Controllers\UsuariController@store');
    Route::put('{id}', 'App\Http\Controllers\UsuariController@update');
    Route::delete('{id}', 'App\Http\Controllers\UsuariController@delete');
    Route::post('/logout', 'App\Http\Controllers\UsuariController@logout');
});

// TIPUS

Route::group(['prefix' => 'tipus', 'middleware'=>'controlatoken'], function () {
    Route::get('', 'App\Http\Controllers\TipusController@index');
    Route::get('{id}', 'App\Http\Controllers\TipusController@show');
    Route::post('', 'App\Http\Controllers\TipusController@store');
    Route::put('{id}', 'App\Http\Controllers\TipusController@update');
    Route::delete('{id}', 'App\Http\Controllers\TipusController@delete');
});

// OBRES

Route::group(['prefix' => 'obres', 'middleware'=>'controlatoken'], function () {
    Route::get('', 'App\Http\Controllers\ObraController@index');
    Route::get('{id}', 'App\Http\Controllers\ObraController@show');
    Route::post('', 'App\Http\Controllers\ObraController@store');
    Route::put('{id}', 'App\Http\Controllers\ObraController@update');
    Route::delete('{id}', 'App\Http\Controllers\ObraController@delete');
});

// AUTORS

Route::group(['prefix' => 'autors', 'middleware'=>'controlatoken'], function () {
    Route::get('', 'App\Http\Controllers\AutorController@index');
    Route::get('{id}', 'App\Http\Controllers\AutorController@show');
    Route::post('', 'App\Http\Controllers\AutorController@store');
    Route::put('{id}', 'App\Http\Controllers\AutorController@update');
    Route::delete('{id}', 'App\Http\Controllers\AutorController@delete');
});

// IDIOMES

Route::group(['prefix' => 'idiomes', 'middleware'=>'controlatoken'], function () {
    Route::get('', 'App\Http\Controllers\IdiomaController@index');
    Route::get('{id}', 'App\Http\Controllers\IdiomaController@show');
    Route::post('', 'App\Http\Controllers\IdiomaController@store');
    Route::put('{id}', 'App\Http\Controllers\IdiomaController@update');
    Route::delete('{id}', 'App\Http\Controllers\IdiomaController@delete');
});

// FOTOGRAFIES_ESPAIS

Route::group(['prefix' => 'fotografies_espais', 'middleware'=>'controlatoken'], function () {
    Route::post('', 'App\Http\Controllers\Fotografia_EspaiController@store');
    Route::delete('{espai_id}/{id}', 'App\Http\Controllers\Fotografia_EspaiController@delete');
    Route::post('{espai_id}/{id}/imatge', 'App\Http\Controllers\Fotografia_EspaiController@imatge');
});

// FOTOGRAFIES_OBRES

Route::group(['prefix' => 'fotografies_obres', 'middleware'=>'controlatoken'], function () {
    Route::post('', 'App\Http\Controllers\Fotografia_ObraController@store');
    Route::delete('{obra_id}/{id}', 'App\Http\Controllers\Fotografia_ObraController@delete');
    Route::post('{obra_id}/{id}/imatge', 'App\Http\Controllers\Fotografia_ObraController@imatge');
});

// SERVEIS_ESPAIS

Route::group(['prefix' => 'serveis_espais', 'middleware'=>'controlatoken'], function () {
    Route::post('', 'App\Http\Controllers\Servei_EspaiController@store');
    Route::delete('{obra_id}/{id}', 'App\Http\Controllers\Servei_EspaiController@delete');
});

// GESTOR_ESPAI

Route::group(['prefix' => 'gestor_espai', 'middleware'=>'controlatoken'], function () {
    Route::post('', 'App\Http\Controllers\Gestor_EspaiController@store');
    Route::delete('{obra_id}/{id}', 'App\Http\Controllers\Gestor_EspaiController@delete');
});

// IDIOMA_OBRA

Route::group(['prefix' => 'idioma_obra', 'middleware'=>'controlatoken'], function () {
    Route::post('', 'App\Http\Controllers\Idioma_ObraController@store');
    Route::delete('{obra_id}/{id}', 'App\Http\Controllers\Idioma_ObraController@delete');
});

// IDIOMA_EXPOSICIO

Route::group(['prefix' => 'idioma_exposicio', 'middleware'=>'controlatoken'], function () {
    Route::post('', 'App\Http\Controllers\Idioma_ExposicioController@store');
    Route::delete('{obra_id}/{id}', 'App\Http\Controllers\Idioma_ExposicioController@delete');
});

// IDIOMA_ESPAI

Route::group(['prefix' => 'idioma_espai', 'middleware'=>'controlatoken'], function () {
    Route::post('', 'App\Http\Controllers\Idioma_EspaiController@store');
    Route::delete('{obra_id}/{id}', 'App\Http\Controllers\Idioma_EspaiController@delete');
});

// ESPAI_EXPOSICIO

Route::group(['prefix' => 'espai_exposicio', 'middleware'=>'controlatoken'], function () {
    Route::post('', 'App\Http\Controllers\Espai_ExposicioController@store');
    Route::delete('{obra_id}/{id}', 'App\Http\Controllers\Espai_ExposicioController@delete');
});

// EXPOSICIO_OBRA

Route::group(['prefix' => 'exposicio_obra', 'middleware'=>'controlatoken'], function () {
    Route::post('', 'App\Http\Controllers\Exposicio_ObraController@store');
    Route::delete('{obra_id}/{id}', 'App\Http\Controllers\Exposicio_ObraController@delete');
});

// COMENTARIS

Route::group(['prefix' => 'comentaris', 'middleware'=>'controlatoken'], function () {
    Route::get('', 'App\Http\Controllers\ComentariController@index');
    Route::get('{id}', 'App\Http\Controllers\ComentariController@show');
    Route::post('', 'App\Http\Controllers\ComentariController@store');
    Route::put('{id}', 'App\Http\Controllers\ComentariController@update');
    Route::delete('{id}', 'App\Http\Controllers\ComentariController@delete');
});

// LOGIN

Route::post('login', 'App\Http\Controllers\LoginController@login');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
