<?php

namespace SiMoms\Models;

use Illuminate\Database\Eloquent\Model;

class Quarterly extends Model
{
    //
    protected $table = 'quarterly';
    protected $fillable = ['name', 'description', 'status'];
    protected $primaryKey = 'id';
    public $timestamps = true;

    public function questions(){
     return $this->hasMany(Questions::class, 'quarterly_id');
    }
}
