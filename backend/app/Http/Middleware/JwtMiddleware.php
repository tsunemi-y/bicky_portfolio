<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;

class JwtMiddleware
{
    public function handle($request, Closure $next, $guard = null)
    {
        $token = $request->cookie('jwt');
        \Log::info($token);

        if(!$token) {
            return response()->json([
                'error' => 'Token not provided.'
            ], 401);
        }
        try {
            $secretKey = base64_decode(config('auth.jwt.secret'));
            $credentials = JWT::decode($token, $secretKey, [config('auth.jwt.algorithm')]);
        } catch(ExpiredException $e) {
            return response()->json([
                'error' => 'Provided token is expired.'
            ], 400);
        } catch(Exception $e) {
            return response()->json([
                'error' => 'An error while decoding token.'
            ], 400);
        }

        $request->auth = $credentials;
        return $next($request);
    }
}
