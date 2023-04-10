<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Idioma_Exposicio extends Model{
    protected $table = 'idioma_exposicio';
    public $timestamps = false;

    protected $fillable = ['exposicio_id','idioma_id', 'descripcio'];
    protected $primaryKey = ['exposicio_id','idioma_id'];

    protected $hidden = ['exposicio_id','idioma_id'];

    protected $with = ['idioma'];

    public $incrementing = false;

    public function idioma(){
        return $this->hasMany(Idioma::class, 'id', 'idioma_id');
    }
}
