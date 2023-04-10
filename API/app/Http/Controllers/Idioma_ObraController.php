<?php

namespace App\Http\Controllers;

use App\Models\Idioma_Obra;
use Illuminate\Http\Request;

class Idioma_ObraController extends Controller{
    public function delete($obra_id, $idioma_id){
        $tupla=Idioma_Obra::where('obra_id', $obra_id)->where('idioma_id', $idioma_id)->delete();

        if ($tupla){
            return response()->json(['status'=>$obra_id." ".$idioma_id.' Borrat Correctament'],200);
        } else {
            return response()->json(['status'=>' Error esborrant'],404);
        }
    }

    public function store(Request $request){ // $request conté els paràmetres POST
        $tupla=new Idioma_Obra();
        $tupla->obra_id=$request->obra_id;
        $tupla->idioma_id=$request->idioma_id;
        $tupla->descripcio=$request->descripcio;
        if ($tupla->save()) {
            return response()->json(['status' => 'Creat','result' => $tupla]);
        } else {
            return response()->json(['status' => 'error guardant']);
        }
    }
}
