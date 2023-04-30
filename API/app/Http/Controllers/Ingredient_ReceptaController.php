<?php

namespace App\Http\Controllers;

use App\Models\Aliment;
use App\Models\Aliment_Diari;
use App\Models\Ingredient_Recepta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Ingredient_ReceptaController extends Controller
{
    public function index()
    {
        $ingredients_receptes=Ingredient_Recepta::all();
        return response()->json($ingredients_receptes);
    }

    public function detalls_recepta($usuari_id, $recepta_id)
    {
        $aliments=Ingredient_Recepta::where();
        return response()->json($aliments);
    }

    public function aliments_recepta($recepta_id)
    {
        $aliments=Ingredient_Recepta::where('recepta_id', $recepta_id);
        return response()->json($aliments);
    }

    public function delete($aliment_id, $recepta_id)
    {
        try {
            DB::table('ingredient_recepta')->where('aliment_id', $aliment_id)->where('recepta_id',$recepta_id)->delete();
        } catch (\Exception $e){
            return response()->json(['status'=>' Error esborrant', 'Ex:' => $e->getMessage()],500);
        }
        return response()->json(['status'=>'eliminat']);
    }

    public function store(Request $request){
        $entrada =Ingredient_Recepta::create($request->all());
        return response()->json(['status' => 'Creat','result' => $entrada]);
    }
}
