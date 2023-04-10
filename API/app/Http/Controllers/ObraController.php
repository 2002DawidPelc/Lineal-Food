<?php

namespace App\Http\Controllers;

use App\Models\Obra;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ObraController extends Controller{
    public function index(){
        $tipus=Obra::all();
        return response()->json($tipus);
    }

    public function paginate($quantitat){
        $tipus=Obra::paginate($quantitat);
        return response()->json($tipus);
    }

    public function show($id){
        $tipus=Obra::findOrFail($id);
        return response()->json($tipus);
    }

    public function obresperautor($tipus_id){
        $espai = Obra::where('autor_id', $tipus_id)->get();
        return response()->json($espai);
    }

    public function obrespertitol($tipus_id){
        $espai = Obra::where('titol', 'like', '%' . $tipus_id . '%')->get();
        return response()->json($espai);
    }

    public function obrespermodalitat($tipus_id){
        $espai = Obra::where('modalitat_id', $tipus_id)->get();
        return response()->json($espai);
    }

    public function obresperanycreacio($tipus_id){
        $espai = Obra::where('any_creacio', $tipus_id)->get();
        return response()->json($espai);
    }

    public function delete($id){
        $tipus=Obra::findOrFail($id);

        try {
            $tipus->delete();
        } catch (\Exception $e){
            return response()->json(['status'=>' Error esborrant'],404);
        }
        return response()->json(['status'=>$id.' Borrat Correctament'],200);
    }

    public function store(Request $request){ // $request conté els paràmetres POST
        if ($tupla =Obra::create($request->all())) {
            return response()->json(['status' => 'Creat','result' => $tupla]);
        } else {
            return response()->json(['status' => 'error guardant']);
        }
    }

    public function update( Request $request, $id ){
        $tipus=Obra::findOrFail($id);
        $tipus->update($request->all());
        return response()->json(['status' => 'Modificar','result' => $tipus]);
    }

    public function imatge( Request $request, $id ){
        $validacio=Validator::make($request->all(),[
            'imatge' => 'required|mimes:jpeg,bmp,png|max:10240',
        ]);
        $tupla=Obra::findOrFail($id);
        if (!$validacio->fails()) {
            $filename = "servei_".$id."_".time().".".$request->imatge->extension();
            $request->imatge->move(public_path('imatges'), $filename);
            $urifoto=url('imatges').'/'.$filename;
            $tupla->icona=$urifoto;
            $tupla->save();
            return response()->json(['status' => 'imatge pujada correctament','uri'=>$urifoto],200);
        } else {
            return response()->json(['status' => 'error: tipus o tamany de la imatge'],404);
        }
    }
}
