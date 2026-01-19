<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\File;
use Illuminate\Support\Facades\Storage;


class UploadFile extends Controller
{
    public function uploadFile(Request $request)
    {
        try {
            $request->validate([
                'file' => 'required|file|mimes:pdf,doc,docx,pptx,xlsx|max:2048'
            ]);

            $file = $request->file('file');
            $name = $file->getClientOriginalName();

            if($request->hasFile('file'))
            {
                $path = $file->store('documents', 'public');

                $saveFile = File::create([
                    'name' => $name,
                    'path' => $path
                ]);
            }

            return response()->json([ 'file' => $name ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([ 'message' => $e ], 422);
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    public function download($id)
    {
        $file = File::findOrFail($id);
        return Storage::disk('public')->download($file->path, $file->name);
    }

    public function index()
    {
        $files = File::all();
        return response()->json([ 'files' => $files ], 200);
    }
}
