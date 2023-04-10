<?php

namespace App\Http\Controllers;

use App\Models\Usuari;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class LoginController extends Controller {
    public function login(Request $request){
        $user = Usuari::where('email', $request->input('email'))->first();
        if($user && Hash::check($request->input('password'), $user->password)){
            $apikey = base64_encode(Str::random(40));
            $user["api_token"]=$apikey;
            $user->save();
            return response()->json(['status' => 'Login OK','result' => $apikey, 'ID' => $user->id, 'Admin' => $user->admin]);
        } else {
            return response()->json(['status' => 'fail'],401);
        }
    }
}
