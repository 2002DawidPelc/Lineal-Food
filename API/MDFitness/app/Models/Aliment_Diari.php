<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aliment_Diari extends Model
{
    protected $table = 'aliment_diari';

    protected $fillable = ['aliment_id', 'diari_id', 'menjar_del_dia', 'data_diari', 'quantitat', 'calories', 'proteines', 'hidrats', 'greixos',
        'sodi', 'sucre', 'fibra'];
}
