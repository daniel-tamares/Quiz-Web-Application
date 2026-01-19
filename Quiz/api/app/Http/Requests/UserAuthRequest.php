<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserAuthRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        if ( $this->isMethod('post') )
        {
            return $this->StoreRules();
        }

        if ( $this->isMethod('put') || $this->isMethod('patch') )
        {
            return $this->updateRules();
        }

        return [];
    }

    protected function storeRules()
    {
        return [
            'username' => 'required|string|min:6|unique:students,username',
            'password' => 'required|string|min:6',
            'profile'  => 'required|image|mimes:jpg,jpeg,png|max:2024',
            'year'     => 'required|numeric|min:0',
            'section'  => 'required|string|min:1',
            'course'   => 'required|string|min:2',
        ];
    }
    protected function updateRules(): array
    {
        $id = $this->route('id'); // get ID from URL

        return [
            'username' => 'sometimes|required|string|min:6|unique:students,username',
            'password' => 'sometimes|required|string|min:6',
            'profile'  => 'sometimes|required|image|mimes:jpg,jpeg,png|max:2024',
            'year'     => 'sometimes|required|string|min:2',
            'section'  => 'sometimes|required|string|min:2',
            'course'   => 'sometimes|required|string|min:2',
        ];
    }

}
