<?php

namespace App\Http\Controllers;

use App\Models\Aliment;
use App\Models\Preferit;
use App\Models\Recepta;
use Illuminate\Http\Request;

class PreferitController extends Controller
{
    public function index()
    {
        $preferits=Preferit::all();
        return response()->json($preferits);
    }
}
