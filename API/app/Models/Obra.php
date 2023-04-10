<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Obra extends Model{
    protected $table = 'obres';
    public $timestamps = false;

    protected $fillable = ['titol', 'descripcio', 'any_creacio', 'autor_id', 'modalitat_id'];

    protected $with = ['foto'];

    public function foto(){
        return $this->belongsTo(Fotografia_Obra::class, 'id', 'obra_id');
    }
}
