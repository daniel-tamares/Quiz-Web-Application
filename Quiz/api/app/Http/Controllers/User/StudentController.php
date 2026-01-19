<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Student;

class StudentController extends Controller
{
    public function requestAccess(Request $request)
    {
        try {
            $id = $request->user()->id;

            $student = Student::find($id);

            $student->access = 'sent';
            $student->update();

            return response()->json([ 'studentId' => $student ], 200);
            
        } catch (\Throwable $th) {
            return response()->json([ 'questions' => $th ], 500);
        }
    }
}
