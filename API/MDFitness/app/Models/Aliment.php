<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aliment extends Model
{
    protected $table = 'aliments';

    protected $fillable = ['nom', 'marca_restaurant', 'calories100', 'proteines100', 'hidrats100', 'greixos100',
        'sodi100', 'sucre100', 'fibra100', 'tipus_id'];
}
