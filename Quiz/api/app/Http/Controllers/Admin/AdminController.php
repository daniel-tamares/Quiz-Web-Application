<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\StudentRequest;

class AdminController extends Controller
{
    public function getStudentRequest()
    {
        try {
            // $student = Student::where('access', 'denied')->get();
            $student = StudentRequest::where('access', 'sent')->get();
            
            return response()->json([ 'admin_student' => $student ], 200);
            
        } catch (\Throwable $th) {
            return response()->json([ 'admin_student' => $th ], 500);
        }
    }

    public function acceptRequest(Request $request, $id)
    {
        try {
            $action = $request->action;

            $student = StudentRequest::where('id', $id)->first();
            $student->access = $action;
            $student->update();
            
            return response()->json([ 'admin_student' => $student ], 200);
            
        } catch (\Throwable $th) {
            return response()->json([ 'admin_student' => $th ], 500);
        }
    }
}
