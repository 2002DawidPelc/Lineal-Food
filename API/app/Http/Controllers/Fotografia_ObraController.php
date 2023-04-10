<?php

namespace App\Http\Controllers;

use App\Models\Fotografia_Obra;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class Fotografia_ObraController extends Controller{

    public function index(){
        $espais_expositius=Fotografia_Obra::paginate(10);
        return response()->json($espais_expositius);
    }

    public function delete($obra_id, $id){
        $foto_obra=Fotografia_Obra::where('obra_id', $obra_id)->where('id', $id)->delete();

        if ($foto_obra){
            $this->eliminarFotoFisica($obra_id, $id); //Es crida a la funció per eliminar la foto físicament
            return response()->json(['status'=>$obra_id." ".$id.' Borrat Correctament'],200);
        } else {
            return response()->json(['status'=>' Error esborrant'],404);
        }
    }

    public function store(Request $request, $obra_id, $id){ // $request conté els paràmetres POST
        $tupla=new Fotografia_Obra();
        $tupla->obra_id=$obra_id;
        $tupla->id=$id;
        $tupla->descripcio="Obra ".$obra_id." foto ".$id;

        $validacio=Validator::make($request->all(),[
            'imatge' => 'required|mimes:jpeg,bmp,png|max:10240', //Es validen els requisits per la foto
        ]);
        if (!$validacio->fails()) { //En cas de complir els requisits s'entra a l'IF
            $this->eliminarFotoFisica($obra_id, $id); //Es crida a la funció per eliminar les fotos anterior físicament
            $filename = "obra_".$obra_id."_foto_".$id."_".time().".".$request->imatge->extension(); //Es posa nom a la nova foto
            $request->imatge->move(public_path('imatges/obres'), $filename); //Es mou la foto a la carpeta /public/imatges/obres
            $urifoto=url('imatges/obres')."/".$filename; //Es crea la URL per la foto
            $tupla->url=$urifoto; //S'actualutza la URL a la taula
            $tupla->save();
            return response()->json(['status' => 'Creat','result' => $tupla]);
        } else {
            return response()->json(['status' => 'error: tipus o tamany de la imatge o dades incorrectes'],404); //S'informa que la imatge no compleix els requisits
        }
    }

    public function eliminarFotoFisica($obra_id, $id){
        foreach (glob(public_path('imatges/obres')."/obra_".$obra_id."_foto_".$id."*.*") as $foto) { //Es cerquen les fotos de l'obra
            File::delete($foto); //S'eliminen les fotos
        }
    }

    public function lastId($espai_id){
        return Fotografia_Obra::where('obra_id', $espai_id)->orderBy('id', 'desc')->limit(1)->get("id");
    }
}
