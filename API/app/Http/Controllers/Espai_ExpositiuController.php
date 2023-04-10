<?php

namespace App\Http\Controllers;

use App\Models\Espai_Expositiu;
use Illuminate\Http\Request;

class Espai_ExpositiuController extends Controller
{
    public function index()
    {
        $espais_expositius=Espai_Expositiu::all();
        return response()->json($espais_expositius);
    }

    public function paginate($quantitat)
    {
        $espais_expositius=Espai_Expositiu::paginate($quantitat);
        return response()->json($espais_expositius);
    }

    public function espaispertipus($tipus_id){
        $espai = Espai_Expositiu::where('tipus_id', $tipus_id)->get();
        return response()->json($espai);
    }

    public function show($id)
    {
        $espai_expositiu=Espai_Expositiu::findOrFail($id);
        return response()->json($espai_expositiu);
    }

    public function delete($id)
    {
        $espai_expositiu=Espai_Expositiu::findOrFail($id);

        try {
            $espai_expositiu->delete();
        } catch (\Exception $e){
            return response()->json(['status'=>' Error esborrant'],404);
        }
        return response()->json(['status'=>$id.' Borrat Correctament'],200);
    }

    public function store(Request $request) // $request conté els paràmetres POST
    {
        if ($tupla =Espai_Expositiu::create($request->all())) {
            return response()->json(['status' => 'Creat','result' => $tupla]);
        } else {
            return response()->json(['status' => 'error guardant']);
        }
    }


    public function update( Request $request, $id ){
        $espai_expositiu=Espai_Expositiu::findOrFail($id);
        $espai_expositiu->update($request->all());
        return response()->json(['status' => 'Modificar','result' => $espai_expositiu]);
    }
}
