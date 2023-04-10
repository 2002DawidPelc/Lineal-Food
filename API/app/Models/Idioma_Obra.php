<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Idioma_Obra extends Model{
    protected $table = 'idioma_obra';
    public $timestamps = false;

    protected $fillable = ['obra_id','idioma_id', 'descripcio'];
    protected $primaryKey = ['obra_id','idioma_id'];

    public $incrementing = false;
}
