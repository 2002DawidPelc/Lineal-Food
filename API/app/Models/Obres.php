<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Obres extends Model{
    protected $table = 'obres';
    public $timestamps = false;

    protected $fillable = ['nom', 'descripio', 'any_creacio', 'autor_id', 'modalitat_id'];
}
