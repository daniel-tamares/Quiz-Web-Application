<?php

namespace App\Http\Controllers\Quiz;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\Quiz;
use App\Models\StudentQuiz;
use App\Models\StudentRequest;

class QuestionController extends Controller
{
    public function reqQuiz(Request $request)
    {
        try {
            $id = $request->user()->id;
            $quiz_id = $request->quiz_id;
            $year = $request->user()->year;

            $req = StudentRequest::where('student_id', $id)->where('quiz_id', $quiz_id)->first();
            
            

            if(!$req)
            {
                $access = 'none';
            }else{
                $access = $req->access;
            }

            $doneOrNot = StudentQuiz::where('student_id', $id)
                                ->where('quiz_id', $quiz_id)
                                ->where('quiz_type', 'M_C')
                                ->first();
            $doneOrNot2 = StudentQuiz::where('student_id', $id)
                                ->where('quiz_id', $quiz_id)
                                ->where('quiz_type', 'C_B')
                                ->first();

            if ($doneOrNot && $doneOrNot2)
            {
                return response()->json([ 'message' => 'Done' ], 200);
            }
            if ($doneOrNot && !$doneOrNot2)
            {
                return response()->json([ 'message' => 'Not yet' ], 200);
            }
            
            if( !$doneOrNot && $access === 'accept')
            {
                $questions = Question::where('quiz_id', $quiz_id)
                                      ->where('quiz_type', 'M_C')
                                      ->paginate(3);

                return response()->json([ 'questions' => $questions, 'quizId' => $quiz_id ], 200);
            }else{
                return response()->json([ 'message' => 'unapproved' ], 200);
            }
            
        } catch (\Throwable $th) {
            return response()->json([ 'message' => $req ], 500);
        }
    }

    public function getChooseBox(Request $request)
    {

        try {

            $id = $request->user()->id;
            $quiz_id = $request->quiz_id;
            $year = $request->user()->year;

            $req = StudentRequest::where('student_id', $id)->first();
            
            

            if(!$req)
            {
                $access = 'none';
            }else{
                $access = $req->access;
            }

            $doneOrNot = StudentQuiz::where('student_id', $id)
                                ->where('quiz_id', $quiz_id)
                                ->where('quiz_type', 'M_C')
                                ->first();
            $doneOrNot2 = StudentQuiz::where('student_id', $id)
                                ->where('quiz_id', $quiz_id)
                                ->where('quiz_type', 'C_B')
                                ->first();

            if ($doneOrNot && $doneOrNot2)
            {
                return response()->json([ 'message' => 'Done' ], 200);
            }
            
            
            if( !$doneOrNot2 && $access === 'accept')
            {
                $questions = Question::where('quiz_id', $quiz_id)
                                      ->where('quiz_type', 'C_B')
                                      ->paginate(3);

                return response()->json([ 'questions' => $questions, 'quizId' => $quiz_id ], 200);
            }else{
                return response()->json([ 'message' => 'unapproved' ], 200);
            }
            
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    public function store( Request $request )
    {
        try {
            $data = $request->validate([
                'quiz_id'   => 'required|numeric|min:1',
                'question'  => 'required|string|min:1',
                'options'   => 'required|array|min:1',
                'answer'    => 'required|string|min:1',
                'quiz_type' => 'required|string|min:1'
            ]);

            $question = Question::create([
                'quiz_id'  => $data['quiz_id'],
                'question' => $data['question'],
                'options'  => $data['options'],
                'answer'  => $data['answer'],
                'quiz_type'=> $data['quiz_type']
            ]);

            return response()->json([ 'question' => $question ], 200);

        } catch ( \Illuminate\Validation\ValidationException $e ) {

            return response()->json([ 'message' => $e ], 422);

        } catch (\Throwable $th) {
            
            return response()->json([ 'message' => $th ], 500);
        }
    }
}
