<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AvailableReservationDatetime extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'available_time',
        'available_date',
        'fee_id',
    ];

    public function getAvailableTimeAttribute($value)
    {
        return Carbon::createFromFormat('H:i:s', $value)->format('H:i');
    }
}
