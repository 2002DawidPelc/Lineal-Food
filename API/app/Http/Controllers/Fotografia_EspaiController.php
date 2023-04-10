<?php

namespace App\Http\Controllers;

use App\Models\Fotografia_Espai;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class Fotografia_EspaiController extends Controller{

    public function index(){
        $espais_expositius=Fotografia_Espai::paginate(10);
        return response()->json($espais_expositius);
    }

    public function delete($espai_id, $id){
        $foto_espai=Fotografia_Espai::where('espai_id', $espai_id)->where('id', $id)->delete();

        if ($foto_espai){
            $this->eliminarFotoFisica($espai_id, $id); //Es crida a la funció per eliminar la foto físicament
            return response()->json(['status'=>$espai_id." ".$id.' Borrat Correctament'],200);
        } else {
            return response()->json(['status'=>' Error esborrant'],404);
        }
    }

    public function store(Request $request, $espai_id, $id ){ // $request conté els paràmetres POST
        $tupla=new Fotografia_Espai();
        $tupla->espai_id=$espai_id;
        $tupla->id=$id;
        $tupla->descripcio="Espai ".$espai_id." foto ".$id;

        $validacio=Validator::make($request->all(),[
            'imatge' => 'required|mimes:jpeg,bmp,png|max:10240', //Es validen els requisits per la foto
        ]);
        if (!$validacio->fails()) { //En cas de complir els requisits s'entra a l'IF
            $this->eliminarFotoFisica($espai_id, $id); //Es crida a la funció per eliminar les fotos anterior físicament
            $filename = "espai_".$espai_id."_foto_".$id."_".time().".".$request->imatge->extension(); //Es posa nom a la nova foto
            $request->imatge->move(public_path('imatges/espais'), $filename); //Es mou la foto a la carpeta /public/imatges/espais
            $urifoto=url('imatges/espais')."/".$filename; //Es crea la URL per la foto
            $tupla->url=$urifoto; //S'actualutza la URL a la taula
            $tupla->save();
            return response()->json(['status' => 'Creat','result' => $tupla]);
        } else {
            return response()->json(['status' => 'error: tipus o tamany de la imatge o dades incorrectes'],404); //S'informa que la imatge no compleix els requisits
        }

    }

    public function eliminarFotoFisica($espai_id, $id){
        foreach (glob(public_path('imatges/espais')."/espai_".$espai_id."_foto_".$id."*.*") as $foto) { //Es cerquen les fotos de l'espai
            File::delete($foto); //S'eliminen les fotos
        }
    }

    public function lastId($espai_id){
        return Fotografia_Espai::where('espai_id', $espai_id)->orderBy('id', 'desc')->limit(1)->get("id");
    }
}
