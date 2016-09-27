<?php

namespace SiMoms\Models;

use Illuminate\Database\Eloquent\Model;

class MomsQuarterly extends Model
{
    //
    protected $table      = 'moms_quarterly';
    protected $primaryKey = 'id';
    protected $fillable   = ['pregnants_id', 'quarterly_id', 'date', 'score', 'status'];
    public $timestamps    = true;
}
