<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fotografia_Obra extends Model{
    protected $table = 'fotografies_obres';
    public $timestamps = false;

    protected $fillable = ['obra_id','id','url','descripcio'];
    protected $primaryKey = ['obra_id','id'];

    public $incrementing = false;
}
