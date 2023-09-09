<?php

namespace App\UseCases;

use App\Services\UserService;
use App\Services\LineMessengerServices;
use App\Services\AuthService;


class UserUseCase
{
    public function __construct(
        private UserService $userService,
        private LineMessengerServices $lineMessengerServices,
        private AuthService $authService,
    ) 
    {    
    }

    public function signUp($request)
    {
        $fee = $this->userService->getFeeByCourse((int) $request->numberOfUse, (int) $request->coursePlan, $request->childName2, $request->lineConsultation);
        
        $useTime = $this->userService->getUseTimeByFee($fee);

        $data = $this->userService->processSignUpData($request, $fee, $useTime);
        
        $user = $this->userService->signUp($data);

        $jwt = $this->authService->generateJwt($user->id, $user->parentName);

        $this->lineMessengerServices->sendRegistrationMessage($user);

        $response = response()->json([
            'isSignUpSuccess' => true
        ]);
    
        $response->withCookie(cookie('jwt', $jwt, 0, "/", null, false, false));

        return $response;
    }
}
