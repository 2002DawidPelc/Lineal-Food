<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Servei_Espai extends Model{
    protected $table = 'serveis_espais';
    public $timestamps = false;

    protected $fillable = ['servei_id','espai_id'];
    protected $primaryKey = ['servei_id','espai_id'];

    public $incrementing = false;
}
