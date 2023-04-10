<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuari extends Model{
    protected $table= 'usuaris';
    public $timestamps = false;

    protected $fillable = ['email','admin','password', 'nom_llinatges', 'DNI', 'telefon'];
}
