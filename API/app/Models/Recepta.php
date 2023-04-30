<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recepta extends Model
{
    protected $table = 'receptes';

    protected $fillable = ['nom', 'descripcio', 'foto_recepta', 'usuari_id'];

    public $timestamps = false;

    protected $with=['detalls_recepta','llistat_aliments'];

    public function llistat_aliments(){
        return $this->hasMany(Ingredient_Recepta::class, 'recepta_id', 'id');
    }

    public function detalls_recepta(){
        return $this->belongsTo(Detalls_Recepta::class, 'id', 'recepta_id');
    }

}
