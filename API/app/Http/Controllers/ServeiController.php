<?php

namespace App\Http\Controllers;

use App\Models\Servei;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class ServeiController extends Controller{
    public function index()
    {
        $espais_expositius=Servei::all();
        return response()->json($espais_expositius);
    }

    public function paginate($quantitat)
    {
        $espais_expositius=Servei::paginate($quantitat);
        return response()->json($espais_expositius);
    }

    public function show($id){
        $servei=Servei::findOrFail($id);
        return response()->json($servei);
    }

    public function delete($id){
        $servei=Servei::findOrFail($id);

        try {
            $servei->delete();
            return response()->json(['status'=>$id.' Borrat Correctament'],200);
        } catch (\Exception $e){
            return response()->json(['status'=>' Error esborrant'],404);
        }
    }

    public function store(Request $request){ // $request conté els paràmetres POST
        if ($tupla =Servei::create($request->all())) {
            return response()->json(['status' => 'Creat','result' => $tupla]);
        } else {
            return response()->json(['status' => 'error guardant']);
        }
    }

    public function update( Request $request, $id ){
        $servei=Servei::findOrFail($id);
        $servei->update($request->all());
        return response()->json(['status' => 'Modificar','result' => $servei]);
    }

    public function imatge( Request $request, $id ){
        $validacio=Validator::make($request->all(),[
            'imatge' => 'required|mimes:jpeg,bmp,png|max:10240',
        ]);
        $tupla=Servei::findOrFail($id);
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
