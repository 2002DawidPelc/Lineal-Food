<?php

namespace App\Http\Controllers;

use App\Models\Usuari;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsuariController extends Controller{
    public function index()
    {
        $espais_expositius=Usuari::all();
        return response()->json($espais_expositius);
    }

    public function paginate($quantitat)
    {
        $espais_expositius=Usuari::paginate($quantitat);
        return response()->json($espais_expositius);
    }

    public function show($id){
        $usuari=Usuari::findOrFail($id);
        return response()->json($usuari);
    }

    public function delete(Request $request, $id){
        $key = explode(' ',$request->header('Authorization')); // Esperam un token 'Bearer token'
        $token=$key[1]; // key[0]->Bearer key[1]->token
        $user = Usuari::where('api_token', $token)->first();
        if ($user->admin==1){
            $usuari=Usuari::findOrFail($id);
            try {
                $usuari->delete();
            } catch (\Exception $e){
                return response()->json(['status'=>' Error esborrant'],404);
            }
            return response()->json(['status'=>$id.' Borrat Correctament'],200);
        } else {
            return response()->json(['status' => 'Error','result' => "Has de ser administrador per poder esborrar"]);
        }
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
        $tupla=new Usuari();
        $tupla->email=$request->email;
        $tupla->admin=$request->admin;
        $tupla->nom_llinatges=$request->nom_llinatges;
        $tupla->DNI=$request->DNI;
        $tupla->telefon=$request->telefon;
        $tupla->password=Hash::make($request->password);
        if ($tupla->save()) {
            return response()->json(['status' => 'Creat','result' => $tupla]);
        } else {
            return response()->json(['status' => 'error guardant']);
        }
    }

    public function update( Request $request, $id ){
        $key = explode(' ',$request->header('Authorization')); // Esperam un token 'Bearer token'
        $token=$key[1]; // key[0]->Bearer key[1]->token
        $user = Usuari::where('api_token', $token)->first();
        if ($user->admin==1){
            $usuari=Usuari::findOrFail($id);
            $usuari->update($request->all());
            if ($request->has('password')){
                if (!str_starts_with($request->password, '$')) {
                    $usuari->password = Hash::make($request->password);
                    $usuari->save();
                }
            }
            return response()->json(['status' => 'Modificar','result' => $usuari]);
        } else {
            return response()->json(['status' => 'Error','result' => "Has de ser administrador per poder modificar"]);
        }
    }

    public function updatenoadmin( Request $request, $id )
    {
        $key = explode(' ', $request->header('Authorization')); // Esperam un token 'Bearer token'
        $token = $key[1]; // key[0]->Bearer key[1]->token
        $user = Usuari::where('api_token', $token)->first();

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


    public function logout(Request $request){
            $key = explode(' ',$request->header('Authorization')); // Esperam un token 'Bearer token'
            $token=$key[1]; // key[0]->Bearer key[1]->token
            $user = Usuari::where('api_token', $token)->first();
            if(!empty($user)){
                $user["api_token"]=null;
                $user->save();
                return response()->json(['status' => 'Logout OK']);
            } else {
                return response()->json(['error' => 'Token incorrecte'], 401); // token incorrecta
            }
    }
}
