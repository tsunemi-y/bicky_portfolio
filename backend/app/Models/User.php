<?php

namespace App\Models;

use App\Models\Reservation;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'parent_name',
        'email',
        'tel',
        'password',
        'child_name',
        'age',
        'gender',
        'diagnosis',
        'child_name2',
        'age2',
        'gender2',
        'diagnosis2',
        'address',
        'introduction',
        'course_plan',
        'consaltation',
        'introduction',
        'fee',
        'user_agent',
        'use_time',
        'line_consultation_flag',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * 予約テーブルとのリレーション
     *
     * @return void
     */
    public function reservations()
    {
        return $this->hasOne(Reservation::class);
    }

    public function scopeFuzzyName($query, $name)
    {
        if ($name != '') {
            return $query->where('parent_name', 'like', "%$name%");
        }
    }

    public function scopeEqualId($query, $id)
    {
        if ($id != '') {
            return $query->where('id', '=', $id);
        }
    }

    public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = bcrypt($password);
    }
}
