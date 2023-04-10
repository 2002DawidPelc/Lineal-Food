<?php

namespace App\Http\Controllers;

use App\Models\Comentari;
use App\Models\Usuari;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

    class ComentariController extends Controller{
        public function index()
        {
            $espais_expositius=Comentari::all();
            return response()->json($espais_expositius);
        }

        public function paginate($quantitat)
        {
            $espais_expositius=Comentari::paginate($quantitat);
            return response()->json($espais_expositius);
        }

    public function show($id){
        $tipus=Comentari::findOrFail($id);
        return response()->json($tipus);
    }

    public function comentarisespaist($espai_id){
        $user = Comentari::where('espai_id', $espai_id)->orderBy('datahora', 'desc')->limit(5)->get();
        return response()->json($user);
    }

    public function delete($id){
        $tipus=Comentari::findOrFail($id);

        try {
            $tipus->delete();
        } catch (\Exception $e){
            return response()->json(['status'=>' Error esborrant'],404);
        }
        return response()->json(['status'=>$id.' Borrat Correctament'],200);
    }

    public function store(Request $request){ // $request conté els paràmetres POST
        $ldate = date('Y-m-d H:i:s');
        if ($tupla =Comentari::create($request->all())) {
            $tupla->datahora=$ldate;
            $tupla->save();
            return response()->json(['status' => 'Creat','result' => $tupla]);
        } else {
            return response()->json(['status' => 'error guardant']);
        }
    }

    public function update( Request $request, $id ){
        $tipus=Comentari::findOrFail($id);
        $tipus->update($request->all());
        return response()->json(['status' => 'Modificar','result' => $tipus]);
    }
}
