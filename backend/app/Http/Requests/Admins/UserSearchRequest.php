<?php

namespace App\Http\Requests\Admins;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UserSearchRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {

        return [
            'id' => 'nullable|integer',
            'name' => 'nullable|string',
        ];
    }

    public function messages()
    {
        return [
            'id.integer' => 'IDは整数で入力してください。',
            'name.string' => '名前は文字列で入力してください。',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $response['errors']  = $validator->errors()->toArray();
        throw new HttpResponseException(response()->json($response, 422));
    }
}
