<?php

namespace SiMoms\Models;

use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    //
    protected $table      = 'feedback';
    protected $primaryKey = 'id';
    protected $fillable   = ['username', 'email', 'message'];
    public $timestamps    = true;
}
