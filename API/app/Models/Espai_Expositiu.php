<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Espai_Expositiu extends Model{
    protected $table= 'espais_expositius';
    public $timestamps = false;

    protected $fillable = ['nom','descripcio','adreca','aforament','tipus_id','municipi', 'telefon', 'web', 'email'];

    protected $hidden = ['tipus_id'];

    protected $with = ['descripcions','exposicions','tipus','serveis','modalitats','foto','valoracio_mitjana'];

    public function descripcions(){
        return $this->hasMany(Idioma_Espai::class, 'espai_id', 'id');
    }

    public function tipus(){
        return $this->belongsTo(Tipus::class, 'tipus_id', 'id');
    }

    public function serveis(){
        return $this->hasMany(View_Serveis_Dun_Espai::class, 'id', 'id');
    }

    public function modalitats(){
        return $this->hasMany(View_Modalitats_Espai::class, 'id', 'id');
    }

    public function exposicions(){
        return $this->belongsToMany(Exposicio::class, 'espai_exposicio', 'espai_id', 'exposicio_id');
    }

    public function foto(){
        return $this->belongsTo(Fotografia_Espai::class, 'id', 'espai_id');
    }

    public function valoracio_mitjana(){
        return $this->belongsTo(View_Mitja_Valoracions::class, 'id', 'id');
    }
}
