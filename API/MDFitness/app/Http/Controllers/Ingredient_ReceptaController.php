<?php

namespace App\Http\Controllers;

use App\Models\Aliment;
use App\Models\Aliment_Diari;
use App\Models\Ingredient_Recepta;
use Illuminate\Http\Request;

class Ingredient_ReceptaController extends Controller
{
    public function index()
    {
        $ingredients_receptes=Ingredient_Recepta::all();
        return response()->json($ingredients_receptes);
    }
}
