<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use Willywes\ApiResponse\ApiResponse;

class CheckForAllScopeAuth
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     *  @param  mixed  ...$scopes
     * @return mixed
     * @throws AuthenticationException
     */

    public function handle($request, $next, ...$scopes)
    {
        if (! $request->user() || ! $request->user()->token()) {
//            throw new AuthenticationException;
            return ApiResponse::Unauthorized(null, 'Acceso no autorizado.');
        }

        foreach ($scopes as $scope) {
            if ($request->user()->tokenCan($scope)) {
                return $next($request);
            }
        }

        return ApiResponse::Unauthorized(null, 'Acceso no autorizado.');

    }

//    public function handle(Request $request, Closure $next)
//    {
//        return $next($request);
//    }
}
