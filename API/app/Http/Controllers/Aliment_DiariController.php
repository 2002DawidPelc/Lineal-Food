<?php

namespace App\Http\Controllers;

use App\Models\Aliment;
use App\Models\Aliment_Diari;
use App\Models\Grafic;
use http\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Aliment_DiariController extends Controller
{
    public function index()
    {
        $aliments_diaris=Aliment_Diari::all();
        return response()->json($aliments_diaris);
    }

    public function diari_usuari_dia($diari_id, $data)
    {
        $aliments_usuari_dia=Aliment_Diari::where('diari_id', $diari_id)->where('data_diari',$data)->get();
        return $aliments_usuari_dia;
    }

    public function diari_usuari($diari_id)
    {
        $aliments_usuari=Grafic::where('diari_id', $diari_id)->take(10)->get();
        return $aliments_usuari;
    }

    public function store(Request $request){
        $entrada =Aliment_Diari::create($request->all());
        return response()->json(['status' => 'Creat','result' => $entrada]);
    }

    public function delete($aliment_id, $diari_id, $menjar_del_dia, $data_diari)
    {
        try {
            DB::table('aliment_diari')->where('aliment_id', $aliment_id)->where('diari_id',$diari_id)->
            where('menjar_del_dia', $menjar_del_dia)->where('data_diari',$data_diari)->delete();
        } catch (\Exception $e){
            return response()->json(['status'=>' Error esborrant', 'Ex:' => $e->getMessage()],500);
        }
        return response()->json(['status'=>'eliminat']);
    }
}
