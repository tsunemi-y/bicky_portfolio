<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use App\Services\FileService;
use App\Services\MailService;
use App\Services\UserService;
use App\Http\Controllers\Controller;
use App\UseCases\Admins\UserUseCase;
use App\Http\Requests\Admins\SendEvaluation;
use App\Http\Requests\Admins\UpdateFeeRequest;
use App\Http\Requests\Admins\UserSearchRequest;
use App\Http\Requests\Admins\SendReceiptRequest;

class UserController extends Controller
{
    public function __construct(
        private UserUseCase $userUseCase,
        private UserService $userService,
        private MailService $mailService, 
        private FileService $fileService,
    )
    {
    }

    public function index(UserSearchRequest $request)
    {
        $name = $request->input('name');
        $id = $request->input('id');
        
        return $this->userService->searchUsersByName($id, $name);
    }

    public function show(User $user)
    {   
        return $user;
    }

    public function sendReceipt(SendReceiptRequest $request)
    {
        $this->userUseCase->sendReceipt($request->name, $request->email, $request->fee);
    }

    public function updateFee(User $user, UpdateFeeRequest $request)
    {
        $this->userService->updateFee($user, $request->fee);
    }

    public function sendEvaluation(SendEvaluation $request)
    {
        $this->userUseCase->sendEvaluation($request);
    }
}
