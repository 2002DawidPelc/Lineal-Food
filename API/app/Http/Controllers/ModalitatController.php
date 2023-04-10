<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Modalitat;

class ModalitatController extends Controller
{
    public function index()
    {
        $espais_expositius=Modalitat::all();
        return response()->json($espais_expositius);
    }

    public function paginate($quantitat)
    {
        $espais_expositius=Modalitat::paginate($quantitat);
        return response()->json($espais_expositius);
    }

    public function show($id)
    {
        $modalitat=Modalitat::findOrFail($id);
        return response()->json($modalitat);
    }

    public function delete($id)
    {
        /*$modalitat=Modalitat::destroy($id);*/
        $modalitat=Modalitat::findOrFail($id);

        try {
            $modalitat->delete();
        } catch (\Exception $e){
            return response()->json(['status'=>' Error esborrant'],404);
        }
        return response()->json(['status'=>$id.' Borrat Correctament'],200);
    }

    public function store(Request $request) // $request conté els paràmetres POST
    {
        if ($tupla =Modalitat::create($request->all())) {
            return response()->json(['status' => 'Creat','result' => $tupla]);
        } else {
            return response()->json(['status' => 'error guardant']);
        }
    }

    public function storevell(Request $request) // $request conté els paràmetres POST
    {
        $modalitat=new Modalitat();
        $modalitat->descripcio=$request->descripcio;
        if ($modalitat->save()) {
            return response()->json(['status' => 'Creat','result' => $modalitat]);
        } else {
            return response()->json(['status' => 'error guardant']);
        }

    }

    public function update( Request $request, $id ){
        $modalitat=Modalitat::findOrFail($id);
        $modalitat->update($request->all());
        return response()->json(['status' => 'Modificar','result' => $modalitat]);
    }

}
