<?php

namespace App\Repositories;

use App\Models\Admin;
use App\Repositories\Interfaces\AdminRepositoryInterface;

class AdminRepository implements AdminRepositoryInterface
{
    public function __construct(
        private Admin $admin, 
    ) 
    {
    }


    public function adminlogin($email)
    {
        return $this->admin->where('email', $email)->first();
    }
}