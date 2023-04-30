<?php

namespace App\Http\Controllers;

use App\Models\Aliment;
use App\Models\Detalls_Recepta;
use App\Models\Recepta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ReceptaController extends Controller
{
    public function index()
    {
        $receptes=Recepta::all();
        return response()->json($receptes);
    }

    public function receptes_usuari($usuari_id){
        $receptes=Recepta::where('usuari_id', $usuari_id)->get();
        return response()->json($receptes);
    }

    public function detalls_recepta(){
        $detalls=Detalls_Recepta::all();
        return response()->json($detalls);
    }

    public function pujarFotoIndividual(Request $request){
        $validacio = Validator::make($request->all(), [
            'url_foto' => 'required|mimes:jpeg,bmp,png|max:10240', //Es validen els requisits per la foto
        ]);
        if (!$validacio->fails()) { //En cas de complir els requisits s'entra a l'IF
            $filename = "recepta" . time() ."." . $request->url_foto->extension(); //Es posa nom a la nova foto
            $request->url_foto->move(public_path('imatges/receptes'), $filename); //Es mou la foto a la carpeta /public/imatges/espais
            $urifoto = url('imatges/receptes') . "/" . $filename; //Es crea la URL per la foto
            return response()->json(['status' => 'Pujada', 'result' => $urifoto]);
        } else {
            return response()->json(['status' => 'error: tipus o tamany de la imatge o dades incorrectes'], 404); //S'informa que la imatge no compleix els requisits
        }
    }

    public function store(Request $request)
    { // $request conté els paràmetres POST
        $recepta = new Recepta();
        $recepta->nom = $request->nom;
        $recepta->descripcio = $request->descripcio;
        $recepta->usuari_id = $request->usuari_id;

        $recepta->save();

        if ($request->pujar=="si"){
            $recepta_id=$recepta->id;

            $validacio = Validator::make($request->all(), [
                'url_foto' => 'required|mimes:jpeg,bmp,png|max:10240', //Es validen els requisits per la foto
            ]);
            if (!$validacio->fails()) { //En cas de complir els requisits s'entra a l'IF
                $filename = "aliment_" . $recepta_id ."." . $request->url_foto->extension(); //Es posa nom a la nova foto
                $request->url_foto->move(public_path('imatges/receptes'), $filename); //Es mou la foto a la carpeta /public/imatges/espais
                $urifoto = url('imatges/receptes') . "/" . $filename; //Es crea la URL per la foto
                $recepta->foto_recepta = $urifoto; //S'actualutza la URL a la taula
                $recepta->save();
                return response()->json(['status' => 'Creat', 'result' => $recepta]);
            } else {
                return response()->json(['status' => 'error: tipus o tamany de la imatge o dades incorrectes'], 404); //S'informa que la imatge no compleix els requisits
            }
        } else {
            $recepta->foto_recepta=$request->url_foto;
            $recepta->save();
            return response()->json(['status' => 'Creat', 'result' => $recepta]);
        }
    }

    public function delete($recepta_id)
    {
        try {
            DB::table('receptes')->where('id', $recepta_id)->delete();
        } catch (\Exception $e){
            return response()->json(['status'=>' Error esborrant', 'Ex:' => $e->getMessage()],500);
        }
        return response()->json(['status'=>'eliminat']);
    }
}
