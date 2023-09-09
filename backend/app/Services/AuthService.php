<?php

namespace App\Services;

use Carbon\Carbon;
use Firebase\JWT\JWT;
use Illuminate\Support\Facades\Hash;
use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Repositories\Interfaces\AdminRepositoryInterface;

class AuthService
{
    public function __construct(
        private UserRepositoryInterface $userRepository,
        private AdminRepositoryInterface $adminRepository,
    ) {
    }

    public function generateJwt($id, $name)
    {
        $tokenId    = base64_encode(random_bytes(32));
        $issuedAt   = Carbon::now();
        $expire     = $issuedAt->copy()->addMonth()->timestamp;
        $serverName = config('app.name');

        $data = [
            'iat'  => $issuedAt->timestamp,
            'jti'  => $tokenId,
            'iss'  => $serverName,
            'nbf'  => $issuedAt->timestamp,
            'exp'  => $expire,
            'data' => [
                'userId'   => $id,
                'userName' => $name,
            ]
        ];

        $secretKey = base64_decode(config('auth.jwt.secret'));
        return JWT::encode($data, $secretKey, config('auth.jwt.algorithm'));
    }

    public function checkPassword($password, $dbPassword)
    {
        if (empty($password)) return false;
        if (!Hash::check($password, $dbPassword)) return false;
        return true;
    }

    public function login($email)
    {
        return $this->userRepository->login($email);
    }

    public function adminLogin($email)
    {
        return $this->adminRepository->adminLogin($email);
    }

    public function getAuthUserId($token)
    {
        if (empty($token)) return '';

        $secretKey = base64_decode(config('auth.jwt.secret'));
        $jwt = JWT::decode($token, $secretKey, [config('auth.jwt.algorithm')]);

        if (empty($jwt)) return '';

        return $jwt->data->userId;
    }
}
