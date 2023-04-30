<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tipus extends Model
{
    protected $table = 'tipus';

    protected $fillable = ['descripcio'];

    public $timestamps = false;
}
