<?php

namespace App\Http\Controllers;

use App\Models\Aliment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AlimentController extends Controller
{
    public function index()
    {
        $aliments=Aliment::all();
        return response()->json($aliments);
    }

    public function show($aliment_id)
    {
        $aliments=Aliment::findOrFail($aliment_id);
        return response()->json($aliments);
    }

    public function store(Request $request)
    { // $request conté els paràmetres POST
        $aliment = new Aliment();
        $aliment->nom = $request->nom;
        $aliment->marca_restaurant = $request->marca_restaurant;
        $aliment->calories100 = $request->calories100;
        $aliment->proteines100 = $request->proteines100;
        $aliment->greixos100 = $request->greixos100;
        $aliment->sodi100 = $request->sodi100;
        $aliment->fibra100 = $request->fibra100;
        $aliment->sucre100 = $request->sucre100;
        $aliment->tipus_id = $request->tipus_id;
        $aliment->save();

        $aliment_id=$aliment->id;

        $validacio = Validator::make($request->foto, [
            'imatge' => 'required|mimes:jpeg,bmp,png|max:10240', //Es validen els requisits per la foto
        ]);
        if (!$validacio->fails()) { //En cas de complir els requisits s'entra a l'IF
            $this->eliminarFotoFisica($aliment_id); //Es crida a la funció per eliminar les fotos anterior físicament
            $filename = "aliment_" . $aliment_id ."." . $request->foto->extension(); //Es posa nom a la nova foto
            $request->foto->move(public_path('imatges/aliments'), $filename); //Es mou la foto a la carpeta /public/imatges/espais
            $urifoto = url('imatges/aliments') . "/" . $filename; //Es crea la URL per la foto
            $aliment->url_foto = $urifoto; //S'actualutza la URL a la taula
            $aliment->save();
            return response()->json(['status' => 'Creat', 'result' => $aliment]);
        } else {
            return response()->json(['status' => 'error: tipus o tamany de la imatge o dades incorrectes'], 404); //S'informa que la imatge no compleix els requisits
        }
    }
    public function eliminarFotoFisica($aliment_id){
        foreach (glob(public_path('imatges/espais')."/aliment_".$aliment_id."*.*") as $foto) { //Es cerquen les fotos de l'espai
            File::delete($foto); //S'eliminen les fotos
        }
    }
}
