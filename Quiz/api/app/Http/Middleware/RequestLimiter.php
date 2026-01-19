<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;

class RequestLimiter
{
    public function handle(Request $request, Closure $next)
    {
        $username = strtolower( $request->input('username', '') );
        $ip = $request->ip();
        $key = "login:$username|$ip";

        if ( RateLimiter::tooManyAttempts($key, 1) )
        {
            $seconds = RateLimiter::availableIn($key);

            return response()->json([
                'message' => "Too many attempts. Try again after {$seconds} seconds."
            ], 429);
        }
        return $next($request);
    }
}
