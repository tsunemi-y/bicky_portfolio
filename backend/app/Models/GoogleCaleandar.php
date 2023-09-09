<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GoogleCaleandar extends Model
{
    use HasFactory;

    protected $fillable = [
        'reservation_id',
        'event_id',
    ];

    public function getEventIdAttribute()
    {
        return explode(' ', base64_decode($this->attributes['event_id']))[0];
    }
}
