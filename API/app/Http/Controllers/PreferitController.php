<?php

namespace App\Http\Controllers;

use App\Models\Aliment;
use App\Models\Preferit;
use App\Models\Recepta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PreferitController extends Controller
{
    public function index()
    {
        $preferits=Preferit::all();
        return response()->json($preferits);
    }

    public function preferitsUsuari($usuari_id)
    {
        $preferitsUsuari=Preferit::where("usuari_id", $usuari_id)->get();
        return response()->json($preferitsUsuari);
    }

    public function store(Request $request){
        $entrada =Preferit::create($request->all());
        return response()->json(['status' => 'Creat','result' => $entrada]);
    }

    public function delete($usuari_id, $aliment_id)
    {
        try {
            Preferit::where("usuari_id", $usuari_id)->where('aliment_id', $aliment_id)->delete();
        } catch (\Exception $e){
            return response()->json(['status'=>' Error esborrant', 'Ex:' => $e->getMessage()],500);
        }
    }
}
