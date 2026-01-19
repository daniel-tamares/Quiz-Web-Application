<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentQuiz extends Model
{
    protected $table = 'student_quizzes';

    protected $fillable = [ 'student_id', 'quiz_id', 'score', 'items', 'is_passed', 'quiz_type', 'answers' ];
    protected $casts = [ 'answers' => 'array' ];

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }
}
