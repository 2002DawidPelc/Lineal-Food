<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingredient_Recepta extends Model
{
    protected $table = 'ingredient_recepta';

    protected $fillable = ['recepta_id', 'aliment_id', 'quantitat', 'calories', 'proteines', 'hidrats', 'greixos',
        'sodi', 'sucre', 'fibra'];
}
