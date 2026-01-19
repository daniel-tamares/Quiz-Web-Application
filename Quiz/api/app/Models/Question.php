<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = [
        'quiz_id',
        'question',
        'options',
        'answer',
        'quiz_type',
    ];

    protected $casts = [ 'options' => 'array' ];

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }
}
