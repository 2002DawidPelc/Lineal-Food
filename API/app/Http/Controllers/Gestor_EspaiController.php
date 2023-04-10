<?php

namespace App\Http\Controllers;

use App\Models\Gestor_Espai;
use Illuminate\Http\Request;

class Gestor_EspaiController extends Controller{
    public function delete($gestor_id, $espai_id){
        $tupla=Gestor_Espai::where('gestor_id', $gestor_id)->where('espai_id', $espai_id)->delete();

        if ($tupla){
            return response()->json(['status'=>$gestor_id." ".$espai_id.' Borrat Correctament'],200);
        } else {
            return response()->json(['status'=>' Error esborrant'],404);
        }
    }

    public function store(Request $request){ // $request conté els paràmetres POST
        $tupla=new Gestor_Espai();
        $tupla->gestor_id=$request->gestor_id;
        $tupla->espai_id=$request->espai_id;
        if ($tupla->save()) {
            return response()->json(['status' => 'Creat','result' => $tupla]);
        } else {
            return response()->json(['status' => 'error guardant']);
        }
    }
}
