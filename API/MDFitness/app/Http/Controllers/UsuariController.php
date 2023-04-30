<?php

namespace App\Http\Controllers;

use App\Models\Aliment;
use App\Models\Usuari;
use Illuminate\Http\Request;

class UsuariController extends Controller
{
    public function index()
    {
        $usuaris=Usuari::all();
        return response()->json($usuaris);
    }
}
