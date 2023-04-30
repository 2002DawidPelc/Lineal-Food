<?php

namespace App\Http\Controllers;

use App\Models\Activitat_Fisica;
use App\Models\Aliment;
use App\Models\Objectiu;
use App\Models\Usuari;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class ObjectiuController extends Controller
{
    public function index()
    {
        $objectius = Objectiu::all();
        return response()->json($objectius);
    }
}
