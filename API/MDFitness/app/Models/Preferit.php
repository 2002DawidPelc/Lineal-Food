<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Preferit extends Model
{
    protected $table = 'preferit';

    protected $fillable = ['usuari_id', 'aliment_id'];
}
