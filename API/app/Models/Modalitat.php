<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Modalitat extends Model
{
    protected $table = 'modalitats';
    public $timestamps = false;

    protected $fillable = ['descripcio',];
    /*protected $with = ['obres'];

    function obres(){
        return $this->hasMany('App\Models\Obra','modalitat_id', 'id');
    }*/
}
