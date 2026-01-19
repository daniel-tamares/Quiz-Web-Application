<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\User\StudentController;
use App\Http\Controllers\User\StudentRequestController;

use App\Http\Controllers\Quiz\QuizController;
use App\Http\Controllers\Quiz\QuestionController;
use App\Http\Controllers\Quiz\StudentQuizController;

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\UploadFile;

// student
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->middleware('rate_limiter');

Route::middleware([ 'auth:sanctum' ])->group( function () {
    Route::post('/logout', [ AuthController::class, 'logout' ]);
    Route::get('/student_info', [AuthController::class, 'getInfo']);
    Route::post('/request', [StudentController::class, 'requestAccess']);
    Route::get('/available_quizzes', [QuizController::class, 'availableQuizzes']);
} );

// quiz
Route::post('/store', [QuizController::class, 'store']);
Route::get('/quizzes', [QuizController::class, 'index']);
Route::put('/deploy/{id}', [QuizController::class, 'deploy']);
// Route::post('/available_quizzes', [QuizController::class, 'availableQuizzes']);

//questions 

Route::middleware([ 'auth:sanctum' ])->group( function () {
    Route::post('/r_quiz', [QuestionController::class, 'reqQuiz']);
    Route::post('/get_choose_box', [QuestionController::class, 'getChooseBox']);
} );

Route::post('/add_questions', [QuestionController::class, 'store']);
// Route::get('/questions', [QuestionController::class, 'index']);
// Route::get('/get_choose_box', [QuestionController::class, 'getChooseBox']);
Route::post('/submit_multiChoie', [StudentQuizController::class, 'checkQuiz']);
Route::post('/view_ans', [StudentQuizController::class, 'viewAns' ]);

// admin only acceptRequest

Route::get('/student_request', [AdminController::class, 'getStudentRequest']);
Route::post('/accept_request/{id}', [AdminController::class, 'acceptRequest']);

// Admin Upload File

Route::post('/upload_file', [UploadFile::class, 'uploadFile']);
Route::get('/download_file/{id}', [UploadFile::class, 'download']);
Route::get('/files', [UploadFile::class, 'index']);

// new admin and student accept or not request 

Route::post('/request_quiz', [StudentRequestController::class, 'request']);
Route::post('/get_req', [StudentRequestController::class, 'get_req']);
Route::post('/accept_deny', [StudentRequestController::class, 'acceptOrDeny']);

// graph

Route::middleware([ 'auth:sanctum' ])->group( function () {
    Route::get('/graph', [StudentQuizController::class, 'graph' ]);
} );
