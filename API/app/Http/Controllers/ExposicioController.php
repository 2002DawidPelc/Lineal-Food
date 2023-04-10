<?php

namespace App\Http\Controllers;

use App\Models\Exposicio;
use Illuminate\Http\Request;

class ExposicioController extends Controller{
    public function index(){
        $exposicions=Exposicio::all();
        return response()->json($exposicions);
    }

    public function paginate($quantitat){
        $exposicions=Exposicio::paginate($quantitat);
        return response()->json($exposicions);
    }

    public function show($id){
        $exposicio=Exposicio::findOrFail($id);
        return response()->json($exposicio);
    }

    public function delete($id){
        $exposicio=Exposicio::findOrFail($id);

        try {
            $exposicio->delete();
        } catch (\Exception $e){
            return response()->json(['status'=>' Error esborrant'],404);
        }
        return response()->json(['status'=>$id.' Borrat Correctament'],200);
    }

    public function store(Request $request){ // $request conté els paràmetres POST
        if ($exposicio=Exposicio::create($request->all())) {
            return response()->json(['status' => 'Creat','result' => $exposicio]);
        } else {
            return response()->json(['status' => 'error guardant']);
        }
    }

    public function update( Request $request, $id ){
        $exposicio=Exposicio::findOrFail($id);
        $exposicio->update($request->all());
        return response()->json(['status' => 'Modificar','result' => $exposicio]);
    }
}
