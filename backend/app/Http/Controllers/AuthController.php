<?php

namespace App\Http\Controllers;

use App\UseCases\AuthUseCase;
use App\Http\Requests\AuthStoreRequest;

class AuthController extends Controller
{
    public function __construct(
        private AuthUseCase $authUseCase,
    )
    {
    }

    public function login(AuthStoreRequest $request)
    {
        return $this->authUseCase->login($request);
    }
}
