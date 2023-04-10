<?php

namespace App\Http\Middleware;

use App\Models\Usuari;
use Closure;
use Illuminate\Http\Request;

class ControlaTokenMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next){
        if ($request->header('Authorization')) { // Hem rebut el header d’autorització?
            $key = explode(' ',$request->header('Authorization')); // Esperam un token 'Bearer token'
            $token=$key[1]; // key[0]->Bearer key[1]->token
            $user = Usuari::where('api_token', $token)->first();
            if(!empty($user)){
                return $next($request); // Usuari trobat. Token correcta. Continuam am la petició
            } else {
                return response()->json(['error' => 'Accés no autoritzat'], 401); // token incorrecta
            }
        } else {
            return response()->json(['error' => 'Token no rebut'], 401);
        }
    }
}
