<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exposicio_Obra extends Model{
    protected $table = 'exposicio_obra';
    public $timestamps = false;

    protected $fillable = ['exposicio_id', 'obra_id'];
    protected $primaryKey = ['exposicio_id', 'obra_id'];

    protected $hidden = ['exposicio_id', 'obra_id'];

    protected $with = ['obra'];

    public $incrementing = false;

    public function obra(){
        return $this->hasMany(Obra::class, 'id', 'obra_id');
    }
}
