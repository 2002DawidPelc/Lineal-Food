<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recepta extends Model
{
    protected $table = 'receptes';

    protected $fillable = ['nom', 'descripcio'];
}
