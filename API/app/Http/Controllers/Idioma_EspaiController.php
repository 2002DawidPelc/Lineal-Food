<?php

namespace App\Http\Controllers;

use App\Models\Idioma_Espai;
use Illuminate\Http\Request;

class Idioma_EspaiController extends Controller{
    public function delete($espai_id, $idioma_id){
        $tupla=Idioma_Espai::where('espai_id', $espai_id)->where('idioma_id', $idioma_id)->delete();

        if ($tupla){
            return response()->json(['status'=>$espai_id." ".$idioma_id.' Borrat Correctament'],200);
        } else {
            return response()->json(['status'=>' Error esborrant'],404);
        }
    }

    public function store(Request $request){ // $request conté els paràmetres POST
        $tupla=new Idioma_Espai();
        $tupla->espai_id=$request->espai_id;
        $tupla->idioma_id=$request->idioma_id;
        $tupla->descripcio=$request->descripcio;
        if ($tupla->save()) {
            return response()->json(['status' => 'Creat','result' => $tupla]);
        } else {
            return response()->json(['status' => 'error guardant']);
        }
    }
}
