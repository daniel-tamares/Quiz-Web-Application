<?php

namespace App\Http\Controllers\Quiz;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Quiz;
use Illuminate\Support\Str;

class QuizController extends Controller
{
    public function index()
    {
        $quiz = Quiz::all();

        return response()->json([ 'quizzes' => $quiz ]);
    }

    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'title'    => 'required|min:2|unique:quizzes,title',
                'subject'  => 'required|min:2',
                'teacher'  => 'required|min:2',
                'year'     => 'required|numeric|min:1',
                'course'   => 'required|string|min:1',
            ]);

        $quiz = Quiz::create([
            'quiz_id'  => (string) Str::uuid(),
            'title'    => strtoupper($data['title']),
            'subject'  => strtoupper($data['subject']),
            'teacher'  => strtoupper($data['teacher']),
            'year'     => $data['year'],
            'course'  => strtoupper($data['course']),
        ]);

        return response()->json([ 'quiz' => $quiz ], 200);

        } catch ( \Illuminate\Validation\ValidationException $e ) {

            return response()->json([ 'message' => $e ], 422);

        } catch (\Throwable $th) {

            return response()->json([ 'message' => $th ], 500);
        }
    }

    public function deploy(Request $request, $id)
    {
        try {
            $data = $request->validate([
                'year' => 'required|numeric',
                'course' => 'required|string|min:1',
                'is_active' => 'required|numeric',
            ]);

            $quiz = Quiz::find($id);
            $quiz->year = $data['year'];
            $quiz->course = $data['course'];
            $quiz->is_active = $data['is_active'];
            $quiz->update();

            return response()->json([ 'quiz' => $quiz ], 200);

        } catch (\Throwable $th) {
            return response()->json([ 'message' => $th ], 500);
        }
    }

    public function availableQuizzes(Request $request)
    {
        try {
            $year = $request->user()->year;
            $course = $request->user()->course;

            $quiz = Quiz::where('year', $year)->where('course', $course)->where('is_active', 1)->get();

            return response()->json([ 'quiz' => $quiz ], 200);

        } catch (\Throwable $th) {
            return response()->json([ 'message' => $th ], 500);
        }
    }
}
