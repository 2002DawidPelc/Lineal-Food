<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Exposicio extends Model
{
    protected $table = 'exposicions';
    public $timestamps = false;

    protected $fillable = ['titol', 'descripcio', 'datainici', 'datafinal', 'tipus'];

    protected $with = ['obres', 'descripcions'];

    public function descripcions(){
        return $this->hasMany(Idioma_Exposicio::class, 'exposicio_id', 'id');
    }

    public function obres(){
        return $this->belongsToMany(Obra::class, 'exposicio_obra', 'exposicio_id', 'obra_id');

    }
}
