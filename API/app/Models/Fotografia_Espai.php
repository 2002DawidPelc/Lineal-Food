<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fotografia_Espai extends Model{
    protected $table = 'fotografies_espais';
    public $timestamps = false;

    protected $fillable = ['espai_id','id','url','descripcio'];
    protected $primaryKey = ['espai_id','id'];

    public $incrementing = false;
}
