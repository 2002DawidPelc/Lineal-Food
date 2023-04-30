<?php

namespace App\Http\Controllers;

use App\Models\Aliment;
use App\Models\Diari;
use Illuminate\Http\Request;

class DiariController extends Controller
{
    public function index()
    {
        $diaris=Diari::all();
        return response()->json($diaris);
    }
}
