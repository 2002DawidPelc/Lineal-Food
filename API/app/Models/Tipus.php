<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tipus extends Model {
    protected $table = 'tipus';
    public $timestamps = false;

    protected $fillable = ['descripcio'];
}
