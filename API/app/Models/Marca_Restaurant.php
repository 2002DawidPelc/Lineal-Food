<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Marca_Restaurant extends Model
{
    protected $table = 'marca_restaurant';

    protected $fillable = ['marca_restaurant', 'logo'];

    public $timestamps = false;
}
