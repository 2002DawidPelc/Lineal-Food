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
    Route::get('/paginar/{quantitat}', 'App\Http\Controllers\ModalitatController@paginate');
    Route::get('{id}', 'App\Http\Controllers\ModalitatController@show');
    Route::post('', 'App\Http\Controllers\ModalitatController@store');
    Route::put('{id}', 'App\Http\Controllers\ModalitatController@update');
    Route::delete('{id}', 'App\Http\Controllers\ModalitatController@delete');
});

// SERVEIS

Route::group(['prefix' => 'serveis', 'middleware'=>'controlatoken'], function () {
    Route::get('', 'App\Http\Controllers\ServeiController@index');
    Route::get('/paginar/{quantitat}', 'App\Http\Controllers\ServeiController@paginate');
    Route::get('{id}', 'App\Http\Controllers\ServeiController@show');
    Route::post('', 'App\Http\Controllers\ServeiController@store');
    Route::put('{id}', 'App\Http\Controllers\ServeiController@update');
    Route::delete('{id}', 'App\Http\Controllers\ServeiController@delete');
    Route::post('{id}/imatge', 'App\Http\Controllers\ServeiController@imatge');
});

// EXPOSICIONS

Route::group(['prefix' => 'exposicions', 'middleware'=>'controlatoken'], function () {
    Route::get('/paginar/{quantitat}', 'App\Http\Controllers\ExposicioController@paginate');
    Route::get('', 'App\Http\Controllers\ExposicioController@index');
    Route::get('{id}', 'App\Http\Controllers\ExposicioController@show');
    Route::post('', 'App\Http\Controllers\ExposicioController@store');
    Route::put('{id}', 'App\Http\Controllers\ExposicioController@update');
    Route::delete('{id}', 'App\Http\Controllers\ExposicioController@delete');
});

// EXPOSICIONS SENSE TOKEN PER LA API

Route::get('/exposicionsst/{id}', 'App\Http\Controllers\ExposicioController@show');

// ESPAIS EXPOSITIUS

Route::group(['prefix' => 'espais_expositius', 'middleware'=>'controlatoken'], function () {
    Route::get('/paginar/{quantitat}', 'App\Http\Controllers\Espai_ExpositiuController@paginate');
    Route::get('', 'App\Http\Controllers\Espai_ExpositiuController@index');
    Route::get('/pertipus/{espai_id}', 'App\Http\Controllers\Espai_ExpositiuController@espaispertipus');
    Route::get('{id}', 'App\Http\Controllers\Espai_ExpositiuController@show');
    Route::post('', 'App\Http\Controllers\Espai_ExpositiuController@store');
    Route::put('{id}', 'App\Http\Controllers\Espai_ExpositiuController@update');
    Route::delete('{id}', 'App\Http\Controllers\Espai_ExpositiuController@delete');
});

// ESPAIS EXPOSITIUS SENSE TOKEN PER LA API

Route::get('/espaisst', 'App\Http\Controllers\Espai_ExpositiuController@index');
Route::get('/espaisst/{id}', 'App\Http\Controllers\Espai_ExpositiuController@show');


// USUARIS

Route::group(['prefix' => 'usuaris', 'middleware'=>'controlatoken'], function () {
    Route::get('', 'App\Http\Controllers\UsuariController@index');
    Route::get('/paginar/{quantitat}', 'App\Http\Controllers\UsuariController@paginate');
    Route::get('{id}', 'App\Http\Controllers\UsuariController@show');
    Route::put('{id}', 'App\Http\Controllers\UsuariController@update');
    Route::delete('{id}', 'App\Http\Controllers\UsuariController@delete');
    Route::post('/logout', 'App\Http\Controllers\UsuariController@logout');
});

Route::group(['prefix' => 'usuarisnoadmin', 'middleware'=>'controlatoken'], function () {
    Route::put('{id}', 'App\Http\Controllers\UsuariController@updatenoadmin');
});

Route::group(['prefix' => 'usuaris'], function () {
    Route::post('', 'App\Http\Controllers\UsuariController@store');
});

// TIPUS

Route::group(['prefix' => 'tipus', 'middleware'=>'controlatoken'], function () {
    Route::get('/paginar/{quantitat}', 'App\Http\Controllers\TipusController@paginate');
    Route::get('', 'App\Http\Controllers\TipusController@index');
    Route::get('{id}', 'App\Http\Controllers\TipusController@show');
    Route::post('', 'App\Http\Controllers\TipusController@store');
    Route::put('{id}', 'App\Http\Controllers\TipusController@update');
    Route::delete('{id}', 'App\Http\Controllers\TipusController@delete');
});

// OBRES

Route::group(['prefix' => 'obres', 'middleware'=>'controlatoken'], function () {
    Route::get('/paginar/{quantitat}', 'App\Http\Controllers\ObraController@paginate');
    Route::get('', 'App\Http\Controllers\ObraController@index');
    Route::get('/perautor/{autor_id}', 'App\Http\Controllers\ObraController@obresperautor');
    Route::get('/permodalitat/{modalitat_id}', 'App\Http\Controllers\ObraController@obrespermodalitat');
    Route::get('/pertitol/{titol}', 'App\Http\Controllers\ObraController@obrespertitol');
    Route::get('/peranycreacio/{anycreacio}', 'App\Http\Controllers\ObraController@obresperanycreacio');
    Route::get('{id}', 'App\Http\Controllers\ObraController@show');
    Route::post('', 'App\Http\Controllers\ObraController@store');
    Route::put('{id}', 'App\Http\Controllers\ObraController@update');
    Route::delete('{id}', 'App\Http\Controllers\ObraController@delete');
});

// AUTORS

Route::group(['prefix' => 'autors', 'middleware'=>'controlatoken'], function () {
    Route::get('/paginar/{quantitat}', 'App\Http\Controllers\AutorController@paginate');
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
    Route::get('', 'App\Http\Controllers\Fotografia_EspaiController@index');
    Route::delete('{espai_id}/{id}', 'App\Http\Controllers\Fotografia_EspaiController@delete');
    Route::post('{espai_id}/{id}', 'App\Http\Controllers\Fotografia_EspaiController@store');
});

// FOTOGRAFIES_OBRES

Route::group(['prefix' => 'fotografies_obres', 'middleware'=>'controlatoken'], function () {
    Route::get('', 'App\Http\Controllers\Fotografia_ObraController@index');
    Route::delete('{obra_id}/{id}', 'App\Http\Controllers\Fotografia_ObraController@delete');
    Route::post('{obra_id}/{id}', 'App\Http\Controllers\Fotografia_ObraController@store');
});

// FOTOGRAFIES SENSE TOKEN

Route::get('fotografies_obresst', 'App\Http\Controllers\Fotografia_ObraController@index');
Route::get('fotografies_espaisst', 'App\Http\Controllers\Fotografia_EspaiController@index');
Route::get('lastObraId/{espai_id}', 'App\Http\Controllers\Fotografia_ObraController@lastId');
Route::get('lastEspaiId/{espai_id}', 'App\Http\Controllers\Fotografia_EspaiController@lastId');

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
    Route::get('/paginar/{quantitat}', 'App\Http\Controllers\ComentariController@paginate');
    Route::get('{espaiid}/{userid}', 'App\Http\Controllers\ComentariController@numcoments');
    Route::get('{id}', 'App\Http\Controllers\ComentariController@show');
    Route::post('', 'App\Http\Controllers\ComentariController@store');
    Route::put('{id}', 'App\Http\Controllers\ComentariController@update');
    Route::delete('{id}', 'App\Http\Controllers\ComentariController@delete');
});

// COMENTARIS SENSE TOKEN

Route::get('comentarisespaist/{espai_id}', 'App\Http\Controllers\ComentariController@comentarisespaist');

// LOGIN

Route::post('login', 'App\Http\Controllers\LoginController@login');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::options('', function (Request $request) {
    return response()->file(public_path('imatges')."/3301.jpg");
});
