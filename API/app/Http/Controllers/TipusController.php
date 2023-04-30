<?php

namespace App\Http\Controllers;

use App\Models\Aliment;
use App\Models\Tipus;
use Illuminate\Http\Request;

class TipusController extends Controller
{
    public function index()
    {
        $tipus=Tipus::all();
        return response()->json($tipus);
    }
}
