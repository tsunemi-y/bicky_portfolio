<?php

namespace App\Http\Controllers;

use App\UseCases\UserUseCase;
use App\Http\Requests\UserStoreRequest;

class UserController extends Controller
{
    public function __construct(
        private UserUseCase $userUseCase,
    )
    {
    }

    public function store(UserStoreRequest $request)
    {
        return $this->userUseCase->signUp($request);
    }
}
