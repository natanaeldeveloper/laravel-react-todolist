<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_user',
        'description',
        'date_conclusion',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
