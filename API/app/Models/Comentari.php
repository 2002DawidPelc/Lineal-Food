<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comentari extends Model{
    protected $table = 'comentaris';
    public $timestamps = false;

    protected $fillable = ['comentari', 'valoracio', 'espai_id', 'usuari_id', 'datahora'];

    protected $with = ['autor'];

    public function autor(){
        return $this->belongsTo(Usuari::class, 'usuari_id', 'id');
    }
}
