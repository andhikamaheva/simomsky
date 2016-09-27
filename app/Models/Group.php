<?php

namespace SiMoms\Models;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    //
    protected $table = 'groups';
    protected $fillable = ['name', 'description', 'status'];
    protected $primaryKey = 'id';
    public $timestamps = true;

    public function questions(){
     return $this->hasMany(Questions::class, 'groups_id');
    }
}
