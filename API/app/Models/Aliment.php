<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aliment extends Model
{
    protected $table = 'aliments';

    protected $fillable = ['nom', 'calories100', 'proteines100', 'hidrats100', 'greixos100', 'id_marca_restaurant', 'nutriScore',
        'sodi100', 'sucre100', 'fibra100', 'tipus_id', 'url_foto', 'gramsPorcio', 'ca', 'en', 'es', 'aprovat'];

    protected $hidden = ['id_marca_restaurant'];

    public $timestamps = false;

    protected $with=['marca_restaurant'];

    public function marca_restaurant(){
        return $this->belongsTo(Marca_Restaurant::class, 'id_marca_restaurant', 'id');
    }
}
