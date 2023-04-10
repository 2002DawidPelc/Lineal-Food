<?php

namespace App\Http\Controllers;

use App\Models\Servei_Espai;
use Illuminate\Http\Request;

class Servei_EspaiController extends Controller{
    public function delete($servei_id, $espai_id){
        $tupla=Servei_Espai::where('servei_id', $servei_id)->where('espai_id', $espai_id)->delete();

        if ($tupla){
            return response()->json(['status'=>$servei_id." ".$espai_id.' Borrat Correctament'],200);
        } else {
            return response()->json(['status'=>' Error esborrant'],404);
        }
    }

    public function store(Request $request){ // $request conté els paràmetres POST
        $tupla=new Servei_Espai();
        $tupla->servei_id=$request->servei_id;
        $tupla->espai_id=$request->espai_id;
        if ($tupla->save()) {
            return response()->json(['status' => 'Creat','result' => $tupla]);
        } else {
            return response()->json(['status' => 'error guardant']);
        }
    }
}
