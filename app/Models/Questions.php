<?php

namespace SiMoms\Models;

use Illuminate\Database\Eloquent\Model;

class Questions extends Model
{
    //

    protected $table      = 'questions';

    protected $primaryKey = 'id';


    protected $fillable   = ['groups_id', 'quarterly_id', 'question', 'score'];


    public $timestamps    = true;

    public function groups()
    {
        return $this->belongsTo(Group::class);
    }
    public function quarterly()
    {
        return $this->belongsTo(Quarterly::class);
    }
}
