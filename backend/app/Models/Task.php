<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'responsible_id',
        'description',
        'date_conclusion',
    ];

    public function responsible()
    {
        return $this->belongsTo(User::class);
    }

    public function dateConclusion(): Attribute
    {
        return  Attribute::make(
            get: fn ($value) => date('d/m/Y', strtotime($value))
        );
    }

    public function createdAt(): Attribute
    {
        return  Attribute::make(
            get: fn ($value) => date('d/m/Y', strtotime($value))
        );
    }
}
