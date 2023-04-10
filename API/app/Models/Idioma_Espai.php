<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Idioma_Espai extends Model{
    protected $table = 'idioma_espai';
    public $timestamps = false;

    protected $fillable = ['espai_id','idioma_id', 'descripcio'];
    protected $primaryKey = ['espai_id','idioma_id'];

    public $incrementing = false;
}
