<?php

namespace App\Http\Controllers;

use App\Models\Idioma;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class IdiomaController extends Controller{
    public function index(){
        $tipus=Idioma::paginate(10);
        return response()->json($tipus);
    }

    public function show($id){
        $tipus=Idioma::findOrFail($id);
        return response()->json($tipus);
    }

    public function delete($id){
        $tipus=Idioma::findOrFail($id);

        try {
            $tipus->delete();
        } catch (\Exception $e){
            return response()->json(['status'=>' Error esborrant'],404);
        }
        return response()->json(['status'=>$id.' Borrat Correctament'],200);
    }

    public function store(Request $request){ // $request conté els paràmetres POST
        if ($tupla =Idioma::create($request->all())) {
            return response()->json(['status' => 'Creat','result' => $tupla]);
        } else {
            return response()->json(['status' => 'error guardant']);
        }
    }

    public function update( Request $request, $id ){
        $tipus=Idioma::findOrFail($id);
        $tipus->update($request->all());
        return response()->json(['status' => 'Modificar','result' => $tipus]);
    }

    public function imatge( Request $request, $id ){
        $validacio=Validator::make($request->all(),[
            'imatge' => 'required|mimes:jpeg,bmp,png|max:10240',
        ]);
        $tupla=Idioma::findOrFail($id);
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
