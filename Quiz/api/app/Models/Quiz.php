<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    protected $fillable = [
        'quiz_id',
        'title',
        'subject',
        'teacher',
        'year',
        'course',
        'is_active'
    ];

    public function students()
    {
        return $this->belongsToMany(Student::class, 'student_quizzes')
                    ->withPivot('score', 'items', 'is_passed')
                    ->withTimestamps();
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    public function stRequest()
    {
        return $this->hasMany(StudentRequest::class);
    }
}
