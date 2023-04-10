<?php

namespace App\Http\Controllers;

use App\Models\Usuari;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class LogoutController extends Controller {
    public function logout(Request $request){
        $user = Usuari::where('email', $request->input('email'))->first();
        if($user){
            $user["api_token"]=null;
            $user->save();
            return response()->json(['status' => 'Logout OK']);
        } else {
            return response()->json(['status' => 'fail'],401);
        }
    }
}
