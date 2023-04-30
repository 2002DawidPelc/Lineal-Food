<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuari extends Model
{
    protected $table = 'usuaris';

    protected $fillable = ['nom_llinatges', 'dni', 'calories100', 'telefon', 'adreca','email','password', 'idioma_fav',
        'altura', 'peso', 'edad', 'sexe', 'activitat_fisica_id', 'objectiu_id', 'objectiu_establert', 'aconsumir', 'admin'];

    public $timestamps = false;
}
