<?php

namespace App\UseCases;

use App\Services\UserService;
use App\Services\AuthService;


class AuthUseCase
{
    public function __construct(
        private UserService $userService,
        private AuthService $authService,
    ) 
    {    
    }

    public function login($request)
    {
        $user = $this->authService->login($request->email);

        if (empty($user)) {
            return [
                'isEmptyUserFailed' => true
            ];
        }     

        if (!$this->authService->checkPassword($request->password, $user->password)) {
            return [
                'isPasswordFailed' => true
            ];
        }       

        $jwt = $this->authService->generateJwt($user->id, $user->parent_name);

        $response = response()->json([
            'isLoginSuccess' => true
        ]);
    
        $response->withCookie(cookie('jwt', $jwt));

        return $response;
    }

    public function adminLogin($request)
    {
        $user = $this->authService->adminLogin($request->email);

        if (empty($user)) {
            return [
                'isEmptyUserFailed' => true
            ];
        }     

        if (!$this->authService->checkPassword($request->password, $user->password)) {
            return [
                'isPasswordFailed' => true
            ];
        }       

        $jwt = $this->authService->generateJwt($user->id, $user->parent_name);

        $response = response()->json([
            'isLoginSuccess' => true
        ]);
    
        $response->withCookie(cookie('adminJwt', $jwt));

        return $response;
    }
}
