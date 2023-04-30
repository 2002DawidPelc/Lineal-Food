<?php

namespace App\Http\Controllers;

use App\Models\Activitat_Fisica;
use App\Models\Aliment;
use App\Models\Usuari;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class Activitat_FisicaController extends Controller
{
    public function index()
    {
        $nivells = Activitat_Fisica::all();
        return response()->json($nivells);
    }
}
