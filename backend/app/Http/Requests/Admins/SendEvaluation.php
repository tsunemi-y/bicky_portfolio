<?php

namespace App\Http\Requests\Admins;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class SendEvaluation extends FormRequest
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
        \Log::info('Request data: ', $this->all());
        return [
            'name' => 'required|string',
            'email' => 'required|email',
            'file' => 'required|file|max:2048',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => '名前は必須です。',
            'name.string' => '名前は文字列で入力してください。',
            'email.required' => 'メールアドレスは必須です。',
            'email.email' => '正しいメールアドレス形式で入力してください。',
            'file.required' => 'ファイルを選択してください。',
            'file.file' => 'アップロードされたファイルが無効です。',
            'file.max' => 'アップロードされたファイルは2MB以内である必要があります。',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $response['errors']  = $validator->errors()->toArray();
        throw new HttpResponseException(response()->json($response, 422));
    }
}
