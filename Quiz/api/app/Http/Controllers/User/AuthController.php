<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Student;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
use Laravel\Sanctum\HasApiTokens;
use App\Http\Requests\UserAuthRequest;
use Illuminate\Support\Facades\RateLimiter;

class AuthController extends Controller
{
    public function index()
    {
        $students  = Student::paginate(5);
        return response()->json([ 'students' => $students ]);
    }

    public function register(UserAuthRequest $request)
    {
        try {
            $filename = null;
            if ($request->hasFile('profile'))
            {
                $file = $request->file('profile');
                $ext = $file->getClientOriginalExtension();
                $timestamp = Carbon::now()->format('YmdHiS');
                $random = Str::random(12);
                $filename =  Str::slug($request->username)."_{$timestamp}_{$random}." .$ext;
                $file->storeAs('profiles', $filename, 'public');
            }

            $student = Student::create([
                'user_id'   => (string) Str::uuid(),
                'username'  => $request->username,
                'password'  => Hash::make($request->password),
                'profile'   => $filename,
                'year'      => $request->year,
                'section'   => $request->section,
                'course'    => strtoupper($request->course),
                'access'    => 'denied',
            ]);

            $token = $student->createToken('authToken')->plainTextToken;

            return response()->json([
                'message'  => $file,
                'token'    => $token,
                'student'  => $student
            ]);


        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([ 'message' => $e ], 422);

        } catch (\Throwable $th) {
            return response()->json([ 'message' => $th ], 500);
        }
    }

    public function login(Request $request)
    {
        try {
            $validated = $request->validate([
                'username'  => 'required|min:6',
                'password'  => 'required|min:6'
            ]);

            $student = Student::where('username', $validated['username'])->first();

            if( !$student || !Hash::check($validated['password'], $student->password) )
            {
                $key = 'login:' . strtolower($validated['username']) . '|' . $request->ip();
                RateLimiter::hit($key, 25);

                return response()->json([ 'message' => 'Invalid incredentials' ], 401);
            }

            $key = 'login' . strtolower($validated['username']) . '|' . $request->ip();
            RateLimiter::clear($key);

            $token = $student->createToken('authToken')->plainTextToken;

            return response()->json([
                'token' => $token,
                'student' => $student
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([ 'message' => $e->errors() ], 422);
        } catch (\Throwable $th) {
            return response()->json([ 'message' => $th ], 500);
        }
    }

    public function getInfo(Request $request)
    {
        $student = $request->user();

        return response()->json([ 'student' => $student ]);
    }

    public function logout( Request $request )
    {
        $request->user()->tokens()->delete();
        $request->setUserResolver( function () {
            return null;
        } );

        return response()->json([ 'message' => $request->user() ]);
    }
}
