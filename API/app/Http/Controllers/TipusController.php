<?php

namespace App\Http\Controllers;

use App\Models\Tipus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TipusController extends Controller{
    public function index()
    {
        $espais_expositius=Tipus::all();
        return response()->json($espais_expositius);
    }

    public function paginate($quantitat)
    {
        $espais_expositius=Tipus::paginate($quantitat);
        return response()->json($espais_expositius);
    }

    public function show($id){
        $usuari=Tipus::findOrFail($id);
        return response()->json($usuari);
    }

    public function delete($id){
        $tipus=Tipus::findOrFail($id);

        try {
            $tipus->delete();
        } catch (\Exception $e){
            return response()->json(['status'=>' Error esborrant'],404);
        }
        return response()->json(['status'=>$id.' Borrat Correctament'],200);
    }

    public function store(Request $request){ // $request conté els paràmetres POST
        if ($tupla =Tipus::create($request->all())) {
            return response()->json(['status' => 'Creat','result' => $tupla]);
        } else {
            return response()->json(['status' => 'error guardant']);
        }
    }

    public function update( Request $request, $id ){
        $tipus=Tipus::findOrFail($id);
        $tipus->update($request->all());
        return response()->json(['status' => 'Modificar','result' => $tipus]);
    }

    public function imatge( Request $request, $id ){
        $validacio=Validator::make($request->all(),[
            'imatge' => 'required|mimes:jpeg,bmp,png|max:10240',
        ]);
        $tupla=Tipus::findOrFail($id);
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
