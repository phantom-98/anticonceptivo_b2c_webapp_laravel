<?php

namespace App\Http\Middleware;

use Willywes\ApiResponse\ApiResponse;
use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Support\Facades\Auth;

class Authenticate extends Middleware
{
    protected $guards = [];

    public function handle($request, Closure $next, ...$guards)
    {
        $this->guards = $guards;
        return parent::handle($request, $next, ...$guards);
    }

    protected function redirectTo($request)
    {
        if (! $request->expectsJson()) {
            if (in_array('intranet', $this->guards)) {
                return route('intranet.auth.show');
            }
            return redirect('/');
        }
    }
}
