<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticable;
use Laravel\Sanctum\HasApiTokens;

class Student extends Model
{
    use HasApiTokens;

    protected $fillable = [
        'user_id',
        'username',
        'password',
        'profile',
        'is_active',
        'year',
        'section',
        'course',
        'access'
    ];
    protected $hidden = [ 'password' ];
    protected $appends = ['profile_url'];

    public function getProfileUrlAttribute()
    {
        return $this->profile ? asset('storage/profiles/' . $this->profile) : null;
    }

    public function quizzes()
    {
        return $this->belongsToMany(Quiz::class, 'student_quizzes')
                    ->withPivot('score', 'items', 'is_passed')
                    ->withTimestamps();
    }

    public function requests()
    {
        return $this->hasMany(StudentRequest::class);
    }
}
