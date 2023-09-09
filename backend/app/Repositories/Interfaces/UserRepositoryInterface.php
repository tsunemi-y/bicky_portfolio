<?php

namespace App\Repositories\Interfaces;

interface UserRepositoryInterface
{
    public function getUserById($id);

    public function searchUsersByName($id, $name);

    public function updateFee($user, $fee, $useTime);

    public function signUp($data);

    public function login($email);
}
