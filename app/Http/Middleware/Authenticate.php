<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        if (! $request->expectsJson()) {
            return route('login');
        }
    }
  
    function handle($request, Closure $next, ...$guards)
    {
      if($jwt_token = $request->cookie('access_token')){
        $request->headers->set('Authorization', 'Bearer ' . $jwt_token);
      }
      $this->authenticate($request, $guards);

      return $next($request);
    }
}
