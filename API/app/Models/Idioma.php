<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Idioma extends Model{
    protected $table = 'idiomes';
    public $timestamps = false;

    protected $fillable = ['idioma'];
}
