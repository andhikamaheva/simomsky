<?php

namespace SiMoms\Models;

use Illuminate\Database\Eloquent\Model;

class Moms extends Model
{
    //
    protected $table = 'moms';
    protected $primaryKey = 'id';
    protected $fillable = ['name', 'birthdate', 'age', 'husband_name', 'education', 'work', 'pregnants', 'users_id'];
    public $timestamps = true;

}
