<?php

namespace App\Http\Controllers;

use App\Models\Aliment;
use App\Models\Usuari;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UsuariController extends Controller
{
    public function index()
    {
        $usuaris = Usuari::all();
        return response()->json($usuaris);
    }

    public function show($usuari_id)
    {
        $usuaris=Usuari::findOrFail($usuari_id);
        return response()->json($usuaris);
    }

    public function store(Request $request){ // $request conté els paràmetres POST
        if ($request->has('email')){
            $user = Usuari::where('email', $request->email)->first();
            if ($user){
                if ($user->email==$request->email){
                    return response()->json(['status' => 'duplicateemail']);
                }
            }
        }
        if ($usuari =Usuari::create($request->all())) {
            $usuari->password = Hash::make($request->password);
            $usuari->activitat_fisica_id=1;
            $usuari->objectiu_id=1;
            $usuari->objectiu_establert="no";
            $usuari->nom_llinatges="";
            $usuari->dni="";
            $usuari->telefon="";
            $usuari->adreca="1";
            $usuari->idioma_fav="es";
            $usuari->admin=false;
            $usuari->save();
            return response()->json(['status' => 'Creat','result' => $usuari]);
        } else {
            return response()->json(['status' => 'error guardant']);
        }
    }

    public function update(Request $request, $id)
    {
        $usuari = Usuari::findOrFail($id);
        $usuari->update($request->all());
        if ($request->has('password')) {
            if (!str_starts_with($request->password, '$')) {
                $usuari->password = Hash::make($request->password);
                $usuari->save();
            }
        }
        return response()->json(['status' => 'Modificar', 'result' => $usuari]);
    }

    public function login(Request $request){
        $user = Usuari::where('email', $request->input('email'))->first();
        if($user && Hash::check($request->input('password'), $user->password)){
            $apikey = base64_encode(Str::random(40));
            $user["api_token"]=$apikey;
            $user->save();
            return response()->json(['status' => 'Login OK','result' => $apikey, 'ID' => $user->id,
                'Admin' => $user->admin, 'Idioma' => $user->idioma_fav, 'aconsumir' => $user->aconsumir
                , 'objectiu_establert' => $user->objectiu_establert]);
        } else {
            return response()->json(['status' => 'fail'],401);
        }
    }

    public function logout(Request $request){
        $user = Usuari::where('email', $request->input('email'))->first();
        if($user){
            $user["api_token"]=null;
            $user->save();
            return response()->json(['status' => 'Logout OK']);
        } else {
            return response()->json(['status' => 'fail'],401);
        }
    }

}
