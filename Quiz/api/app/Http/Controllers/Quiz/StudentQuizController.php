<?php

namespace App\Http\Controllers\Quiz;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\StudentQuiz;
use App\Models\Student;
use App\Models\StudentRequest;

class StudentQuizController extends Controller
{
    public function checkQuiz(Request $request)
    {
        try {
            $data = $request->validate([
                'answer' => 'required|array|min:1'
            ]);

            $quizForm = $request->answer;
            $total = $request->total;
            $score = 0;
            $result = [];
            $id = $request->id;
            $quizId = $request->quizId;
            $quizType = $request->quizType;

            // $total = Question::where('quiz_id',)

            foreach ($quizForm as $questionId => $studentAsnwer)
            {
                $question = Question::find($questionId);
                if (!$question) continue;

                $isCorrect = $question->answer === $studentAsnwer;
                if ( $isCorrect ) $score++;


                $result[] = [
                    'question'       => $question->question,
                    'your_answer'    => $studentAsnwer,
                    'correct_answer' => $question->answer,
                    'is_correct'     => $isCorrect,
                ];
            }

            $pass = $total/2;

            $check = ($score > $pass) ? true : false;

            // $student = Student::where('id', 4)->with('quizzes')->get();
            // $student = StudentQuiz::where('student_id', 4)->with('quiz.questions')->get();
            // $student = StudentQuiz::where('student_id', $id)->first();

            $student = StudentQuiz::create([
                'student_id' => $id,
                'quiz_id'    => $quizId,
                'score'      => $score,
                'items'      => $total,
                'is_passed'  => $check,
                'quiz_type'  =>$quizType,
                'answers'    => $quizForm,
            ]);

            $mc = StudentQuiz::where('student_id', $id)
                               ->where('quiz_id', $quizId)
                               ->where('quiz_type', 'M_C')
                               ->first();
            $cb = StudentQuiz::where('student_id', $id)
                               ->where('quiz_id', $quizId)
                               ->where('quiz_type', 'C_B')
                               ->first();
            
            if ( $mc && $cb )
            {
                $req = StudentRequest::where('student_id', $id)->where('quiz_id', $quizId)->delete();
            }

            return response()->json([
                'ans' => $quizForm,
                'result'  => $result,
                'score'   => $score,
                'total'   => $total,
                'student' => $student,
                'id' => $id,
                'q_id' => $quizId,
                'q_type' => $quizType,
            ], 200);

        }catch ( \Illuminate\Validation\ValidationException $e ) {
            return response()->json([ 'message' => $e ], 422);

        } catch (\Throwable $th) {
            return response()->json([ 'message' => $th ], 500);
        }
    }

    public function viewAns(Request $request)
    {
        try {
            $id = $request->id;
            $type = $request->quiz_type;
            $quizId = $request->quiz_id;

            $ans = StudentQuiz::where('student_id', $id)
                                ->where('quiz_id', $quizId)
                                ->where('quiz_type', $type)
                                ->first();

            $questions = Question::where('quiz_id', $quizId)
                                    ->where('quiz_type', $type)
                                    ->get();

            return response()->json([
                'ans'       => $ans,
                'questions' => $questions
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([ 'message' => $th ], 500);
        }
    }

    public function graph(Request $request)
    {
        try {
            $id = $request->user()->id;
            $score = [];
            $items = [];
            $total = [];
            $title = [];
            $title2 = [];

            $sub = StudentQuiz::with('quiz')->where('student_id', $id)->get();
            $mc = [];
            $cb = [];
            

            if (!$sub)
            {
                return response()->json([ 'message' => 'null' ], 200);
            }

            foreach ($sub as $quiz)
            {
                $score[] = $quiz->score;
                $items[] = $quiz->items;
                $title[] = $quiz->quiz->title. "Type:" . $quiz->quiz_type . "Items:" . $quiz->items ;
                

                if ( $quiz->quiz_type === 'M_C' )
                {
                    $mc[] = $quiz->score;
                }
                if ( $quiz->quiz_type === 'C_B' )
                {
                    $cb[] = $quiz->score;
                }
                if ( !in_array($quiz->quiz->title, $title2) )
                {
                    $title2[] = $quiz->quiz->title;
                }
            }

            return response()->json([ 
                'score' => $score,
                'title' => $title,
                'title2' => $title2,
                'mc'    => $mc,
                'cb'    => $cb,
                'items' => $items
            ], 200);


        } catch (\Throwable $th) {
            return response()->json([ 'message' => $th ], 500);
        }
    }
}
