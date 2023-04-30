<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Preferit extends Model
{
    protected $table = 'preferit';

    protected $fillable = ['usuari_id', 'aliment_id'];

    public $timestamps = false;

    protected $with = ['detall_aliment'];

    public function detall_Aliment(){
        return $this->belongsTo(Aliment::class, 'aliment_id', 'id');
    }
}
