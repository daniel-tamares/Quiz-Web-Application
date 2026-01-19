<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\StudentRequest;

class StudentRequestController extends Controller
{
    public function get_req(Request $request)
    {
        $req = StudentRequest::with('student','quiz')->where('access', 'sent')->get();

        return response()->json([ 'req' => $req ], 200);
    }

    public function request(Request $request)
    {
      try {
            $id = $request->id;
            $q_id = $request->quiz_id;

            $req = StudentRequest::create([
                'student_id' => $id,
                'quiz_id'    => $q_id,
                'access'     => 'sent'
            ]);

            return response()->json([ 'req' => $req ], 200);
            
        } catch (\Throwable $th) {
            return response()->json([ 'req' => $th ], 500);
        }  
    }

    public function acceptOrDeny(Request $request)
    {
      try {
            $id = $request->id;
            $q_id = $request->quiz_id;
            $action = $request->action;

            $req = StudentRequest::where('student_id', $id)
                                 ->where('quiz_id', $q_id)
                                 ->first();
            $req->access = $action;
            $req->update();

            return response()->json([ 'req' => $req ], 200);
            
        } catch (\Throwable $th) {
            return response()->json([ 'req' => $th ], 500);
        }  
    }
}
