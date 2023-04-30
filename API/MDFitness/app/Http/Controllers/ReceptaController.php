<?php

namespace App\Http\Controllers;

use App\Models\Aliment;
use App\Models\Recepta;
use Illuminate\Http\Request;

class ReceptaController extends Controller
{
    public function index()
    {
        $receptes=Recepta::all();
        return response()->json($receptes);
    }
}
