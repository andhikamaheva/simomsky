<?php

namespace SiMoms\Models;

use Illuminate\Database\Eloquent\Model;

class Pregnants extends Model
{
    //
    protected $table      = 'pregnants';
    protected $primaryKey = 'id';
    protected $fillabel   = ['last_period', 'estimate', 'pregnants'];
    public $timestamps    = true;
}
