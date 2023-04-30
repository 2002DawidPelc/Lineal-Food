<?php

namespace App\Http\Controllers;

use App\Models\Aliment;
use App\Models\Marca_Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class Marca_RestaurantController extends Controller
{
    public function index()
    {
        $aliments=Marca_Restaurant::all();
        return response()->json($aliments);
    }
}
