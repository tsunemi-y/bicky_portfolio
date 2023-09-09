<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;

class UserRepository implements UserRepositoryInterface
{
    public function __construct(
        private User $user, 
    ) 
    {
    }

    public function getUserById($id)
    { 
        return $this->user->find($id);
    }
    
    public function searchUsersByName($id, $name)
    {
        return $this->user
                ->fuzzyName($name)
                ->equalId($id)
                ->get(['id', 'parent_name', 'email', 'fee']);
    }

    public function updateFee($user, $fee, $useTime)
    {
        $user->update([
            'fee' => $fee,
            'use_time' => $useTime,
        ]);
    }

    public function signUp($data)
    {
        return $this->user->create([
            'parent_name'                 => $data['parentName'],
            'email'                      => $data['email'],
            'tel'                        => $data['tel'],
            'password'                   => $data['password'],
            'child_name'                  => $data['childName'],
            'age'                        => $data['age'],
            'gender'                     => $data['gender'],
            'diagnosis'                  => $data['diagnosis'],
            'child_name2'                 => $data['childName2'],
            'age2'                       => $data['age2'],
            'gender2'                    => $data['gender2'],
            'diagnosis2'                 => $data['diagnosis2'],
            'address'                    => $data['address'],
            'introduction'               => $data['introduction'],
            'course_plan'                 => $data['coursePlan'],
            'consaltation'               => $data['consaltation'],
            'fee'                        => $data['fee'],
            'user_agent'                  => $data['userAgent'],
            'use_time'                   => $data['useTime'],
            'line_consultation_flag'     => $data['lineConsultationFlag'],
        ]);
    }

    public function login($email)
    {
        return $this->user->where('email', $email)->first();
    }
}