<?php

namespace App\Http\Controllers;

use App\Models\Espai_Exposicio;
use App\Models\Idioma_Espai;
use Illuminate\Http\Request;

class Espai_ExposicioController extends Controller{
    public function delete($espai_id, $exposicio_id){
        $tupla=Espai_Exposicio::where('espai_id', $espai_id)->where('exposicio_id', $exposicio_id)->delete();

        if ($tupla){
            return response()->json(['status'=>$espai_id." ".$exposicio_id.' Borrat Correctament'],200);
        } else {
            return response()->json(['status'=>' Error esborrant'],404);
        }
    }

    public function store(Request $request){ // $request conté els paràmetres POST
        $tupla=new Espai_Exposicio();
        $tupla->espai_id=$request->espai_id;
        $tupla->exposicio_id=$request->exposicio_id;
        if ($tupla->save()) {
            return response()->json(['status' => 'Creat','result' => $tupla]);
        } else {
            return response()->json(['status' => 'error guardant']);
        }
    }
}
