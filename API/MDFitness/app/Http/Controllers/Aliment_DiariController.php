<?php

namespace App\Http\Controllers;

use App\Models\Aliment;
use App\Models\Aliment_Diari;
use Illuminate\Http\Request;

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
}
