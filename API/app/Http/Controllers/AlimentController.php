<?php

namespace App\Http\Controllers;

use App\Models\Aliment;
use App\Models\Marca_Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AlimentController extends Controller
{
    public function index()
    {
        $aliments=Aliment::where('aprovat', true)->get();
        return response()->json($aliments);
    }

    public function solicituds()
    {
        $aliments=Aliment::where('aprovat', false)->get();
        return response()->json($aliments);
    }

    public function norestaurant()
    {
        $aliments=Aliment::where('tipus_id', '!=', '8')->get();
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
        $aliment->calories100 = $request->calories100;
        $aliment->proteines100 = $request->proteines100;
        $aliment->hidrats100 = $request->hidrats100;
        $aliment->greixos100 = $request->greixos100;
        $aliment->sodi100 = $request->sodi100;
        $aliment->fibra100 = $request->fibra100;
        $aliment->sucre100 = $request->sucre100;
        $aliment->tipus_id = $request->tipus_id;
        $aliment->gramsPorcio = $request->gramsPorcio;
        $aliment->nutriScore = $request->nutriScore;
        $aliment->ca = $request->ca;
        $aliment->es = $request->es;
        $aliment->en = $request->en;
        $aliment->contribuidor = $request->contribuidor;
        $aliment->aprovat = false;
        $aliment->id_marca_restaurant = $request->id_marca_restaurant;

        $aliment->save();

        if ($request->pujar=="si"){
            $aliment_id=$aliment->id;

            $validacio = Validator::make($request->all(), [
                'url_foto' => 'required|mimes:jpeg,bmp,png|max:10240', //Es validen els requisits per la foto
            ]);
            if (!$validacio->fails()) { //En cas de complir els requisits s'entra a l'IF
                $filename = "aliment_" . $aliment_id ."." . $request->url_foto->extension(); //Es posa nom a la nova foto
                $request->url_foto->move(public_path('imatges/aliments'), $filename); //Es mou la foto a la carpeta /public/imatges/espais
                $urifoto = url('imatges/aliments') . "/" . $filename; //Es crea la URL per la foto
                $aliment->url_foto = $urifoto; //S'actualutza la URL a la taula
                $aliment->save();
                return response()->json(['status' => 'Creat', 'result' => $aliment]);
            } else {
                return response()->json(['status' => 'error: tipus o tamany de la imatge o dades incorrectes'], 404); //S'informa que la imatge no compleix els requisits
            }
        } else {
            $aliment->url_foto=$request->url_foto;
            $aliment->save();
            return response()->json(['status' => 'Creat', 'result' => $aliment]);
        }
    }

    public function pujarFotoIndividual(Request $request){
        $validacio = Validator::make($request->all(), [
            'url_foto' => 'required|mimes:jpeg,bmp,png|max:10240', //Es validen els requisits per la foto
        ]);
        if (!$validacio->fails()) { //En cas de complir els requisits s'entra a l'IF
            $filename = "aliment_" . time() ."." . $request->url_foto->extension(); //Es posa nom a la nova foto
            $request->url_foto->move(public_path('imatges/aliments'), $filename); //Es mou la foto a la carpeta /public/imatges/espais
            $urifoto = url('imatges/aliments') . "/" . $filename; //Es crea la URL per la foto
            return response()->json(['status' => 'Pujada', 'result' => $urifoto]);
        } else {
            return response()->json(['status' => 'error: tipus o tamany de la imatge o dades incorrectes'], 404); //S'informa que la imatge no compleix els requisits
        }
    }

    public function alimentsPerMarcaRestaurant($marca_restaurant){
        $mr=Marca_Restaurant::where('marca_restaurant', $marca_restaurant)->get();
        $id_marca_restaurant=$mr[0]->id;
        $aliments=Aliment::where('id_marca_restaurant', $id_marca_restaurant)->orderBy('id', 'DESC')->get();
        return response()->json($aliments);
    }

    public function update( Request $request, $id ){
        $aliment=Aliment::findOrFail($id);
        $aliment->update($request->all());
        return response()->json(['status' => 'Modificar','result' => $aliment]);
    }

    public function delete($id){
        $tipus=Aliment::findOrFail($id);

        try {
            $tipus->delete();
        } catch (\Exception $e){
            return response()->json(['status'=>' Error esborrant'],404);
        }
        return response()->json(['status'=>'Borrat Correctament']);
    }
}
