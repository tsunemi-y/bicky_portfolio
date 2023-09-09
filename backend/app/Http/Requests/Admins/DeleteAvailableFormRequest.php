<?php

namespace App\Http\Requests\Admins;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class DeleteAvailableFormRequest extends FormRequest
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
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
        ];
    }

    public function messages()
    {
        return [
            'date.required' => '日付を入力してください。',
            'date.date' => '有効な日付形式で入力してください。',
            'time.required' => '時間を入力してください。',
            'time.date_format' => '有効な時間形式で入力してください。',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $response['errors']  = $validator->errors()->toArray();
        throw new HttpResponseException(response()->json($response, 422));
    }
}
