<?php

namespace App\Http\Controllers;

use App\Models\Idioma_Exposicio;
use Illuminate\Http\Request;

class Idioma_ExposicioController extends Controller{
    public function delete($exposicio_id, $idioma_id){
        $tupla=Idioma_Exposicio::where('exposicio_id', $exposicio_id)->where('idioma_id', $idioma_id)->delete();

        if ($tupla){
            return response()->json(['status'=>$exposicio_id." ".$idioma_id.' Borrat Correctament'],200);
        } else {
            return response()->json(['status'=>' Error esborrant'],404);
        }
    }

    public function store(Request $request){ // $request conté els paràmetres POST
        $tupla=new Idioma_Exposicio();
        $tupla->exposicio_id=$request->exposicio_id;
        $tupla->idioma_id=$request->idioma_id;
        $tupla->descripcio=$request->descripcio;
        if ($tupla->save()) {
            return response()->json(['status' => 'Creat','result' => $tupla]);
        } else {
            return response()->json(['status' => 'error guardant']);
        }
    }
}
