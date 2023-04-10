<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gestor_Espai extends Model{
    protected $table = 'gestor_espai';
    public $timestamps = false;

    protected $fillable = ['gestor_id','espai_id'];
    protected $primaryKey = ['gestor_id','espai_id'];

    public $incrementing = false;
}
