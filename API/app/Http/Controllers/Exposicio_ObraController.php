<?php

namespace App\Http\Controllers;

use App\Models\Espai_Exposicio;
use App\Models\Exposicio_Obra;
use App\Models\Idioma_Espai;
use Illuminate\Http\Request;

class Exposicio_ObraController extends Controller{
    public function delete($exposicio_id, $obra_id){
        $tupla=Exposicio_Obra::where('exposicio_id', $exposicio_id)->where('obra_id', $obra_id)->delete();

        if ($tupla){
            return response()->json(['status'=>$exposicio_id." ".$obra_id.' Borrat Correctament'],200);
        } else {
            return response()->json(['status'=>' Error esborrant'],404);
        }
    }

    public function store(Request $request){ // $request conté els paràmetres POST
        $tupla=new Exposicio_Obra();
        $tupla->exposicio_id=$request->exposicio_id;
        $tupla->obra_id=$request->obra_id;
        if ($tupla->save()) {
            return response()->json(['status' => 'Creat','result' => $tupla]);
        } else {
            return response()->json(['status' => 'error guardant']);
        }
    }
}
