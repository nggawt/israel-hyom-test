<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Facades\JWTAuth;
use Exception;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;

class JWTMiddleWare extends BaseMiddleware
{
  /**
   * Handle an incoming request.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
   * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
   */
  public function handle($request, Closure $next)
  {


    if ($this->allowUrls())
      return $next($request);

    $jwt_token = $request->cookie('access_token');
    try {
      if ($jwt_token) {
        $request->headers->set('Authorization', 'Bearer ' . $jwt_token);
        if ($this->allowUrls('refresh'))
          return $next($request);
      }
      $user = JWTAuth::parseToken()->authenticate();
    } catch (Exception $e) {
      if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {
        $status     = 401;
        $message    = 'This token is invalid. Please Login';
        JWTAuth::invalidate($jwt_token);
        return response()->json(compact('status', 'message'), $status);
      } else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
        // If the token is expired, then it will be refreshed and added to the headers
        try {
          $refreshed = JWTAuth::refresh(JWTAuth::getToken());
          $user = JWTAuth::setToken($refreshed)->toUser();
          $request->headers->set('Authorization', 'Bearer ' . $refreshed);
          return $next($request)->cookie('access_token', $refreshed, 60, "/");
          //return response(['access_token' => $refreshed, 'user' => $user], 200)->cookie('access_token', $refreshed);
        } catch (JWTException $e) {
          /* return $next($request); */
          //dd($request->header());
          return response()->json([
            'code'   => 103,
            'err' => $e,
            'message' => 'Token cannot be refreshed, please Login again'
          ]);
        }
      } else {
        $status = 404;
        $message = 'Authorization Token not found';
        return response()->json(compact('status', 'message'), 404);
      }
    }
    return $next($request);
  }

  protected function allowUrls(string $endPoints = 'login|register', string $domains = '(?:localhost|10\.0\.0\.\d)\:\d{4}|nwt.ddns\.net|nwt\-me\.ddns.net')
  {
    $activeTab = 'active\-tab\=\w{1\,60}';
    $page = 'page\=\d{1,3}';
    $regex = "/^https?\:\/\/(?:$domains)\/api\/(?:$endPoints)\??(?:$page|$activeTab|$page&$activeTab|$activeTab&$page)?$/";
    return preg_match($regex, url()->current());
  }
}
