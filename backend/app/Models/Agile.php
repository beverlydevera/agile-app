<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agile extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'type',
        'delete_flg',
    ];
}
