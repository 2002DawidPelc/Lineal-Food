<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Espai_Exposicio extends Model{
    protected $table = 'espai_exposicio';
    public $timestamps = false;

    protected $fillable = ['espai_id','exposicio_id'];
    protected $primaryKey = ['espai_id','exposicio_id'];

    public $incrementing = false;
}
