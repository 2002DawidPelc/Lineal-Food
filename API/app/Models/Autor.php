<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Autor extends Model{
    protected $table = 'autors';
    public $timestamps = false;

    protected $fillable = ['nom', 'data_naixement', 'nacionalitat'];
    protected $with = ['obres'];

    function obres(){
        return $this->hasMany('App\Models\Obra','autor_id', 'id');
    }
}
