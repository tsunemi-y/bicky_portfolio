<?php

namespace App\Services;

use App\Consts\ConstUser;
use App\Repositories\Interfaces\UserRepositoryInterface;

class UserService
{
    public function __construct(
        private UserRepositoryInterface $userRepository,
    ) {
    }

    public function getUserById($id)
    { 
        return $this->userRepository->getUserById($id);
    }

    public function getFeeByCourse($numberOfUse, $coursePlan, $siblingUse, $lineConsultation)
    {
        // LINEのみ相談
        if ($lineConsultation) return ConstUser::FEE_LINE_ONLY;

        if ($numberOfUse === ConstUser::ONE_USE) {
            if (!empty($siblingUse)) return ConstUser::FEE_ONE_SIBLING;
            if ($coursePlan === ConstUser::COURSE_WEEKDAY) return ConstUser::FEE_ONE_WEEKDAY;
            if ($coursePlan === ConstUser::COURSE_HOLIDAY) return ConstUser::FEE_ONE_HOLIDAY;
        } else if ($numberOfUse === ConstUser::TWO_USE) {
            if (!empty($siblingUse)) return ConstUser::FEE_TWO_SIBLING;
            if ($coursePlan === ConstUser::COURSE_WEEKDAY) return ConstUser::FEE_TWO_WEEKDAY;
            if ($coursePlan === ConstUser::COURSE_HOLIDAY) return ConstUser::FEE_TWO_HOLIDAY;
        }
    }

    public function getUseTimeByFee($fee)
    { 
        if ($fee === ConstUser::FEE_ONE_SIBLING || $fee === ConstUser::FEE_TWO_SIBLING) {
            return ConstUser::LONG_USE_TIME;
        } else {
            return ConstUser::NORMAL_USE_TIME;
        }
    }

    public function searchUsersByName($id, $name)
    {
        return $this->userRepository->searchUsersByName($id, $name);
    }

    public function updateFee($user, $fee)
    {
        $useTime = $this->getUseTimeByFee($fee);
        $this->userRepository->updateFee($user, $fee, $useTime);
    }

    public function processSignUpData($request, $fee, $useTime)
    {
        return [
            'parentName'                 => $request->parentName,
            'email'                      => $request->email,
            'tel'                        => $request->tel,
            'password'                   => $request->password,
            'childName'                  => $request->childName,
            'age'                        => $request->age,
            'gender'                     => $request->gender,
            'diagnosis'                  => $request->diagnosis,
            'childName2'                 => $request->childName2,
            'age2'                       => $request->age2,
            'gender2'                    => $request->gender2,
            'diagnosis2'                 => $request->diagnosis2,
            'address'                    => $request->address,
            'introduction'               => $request->introduction,
            'coursePlan'                 => $request->coursePlan,
            'consaltation'               => $request->consaltation,
            'fee'                        => $fee,
            'userAgent'                  => $_SERVER['HTTP_USER_AGENT'],
            'useTime'                   => $useTime,
            'lineConsultationFlag'     => $request->lineConsultation,
        ];
    }

    public function signUp($data)
    {
        return $this->userRepository->signUp($data);
    }
}
