<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AuthStoreRequest extends FormRequest
{
    public function rules()
    {
        return [
            'email' => 'required|email',
            'password' => 'required|min:8',
        ];
    }

    public function messages()
    {
        return [
            'email.required' => 'メールアドレスは必須です。',
            'email.email' => '有効なメールアドレスを入力してください。',
            'password.required' => 'パスワードは必須です。',
            'password.min' => 'パスワードは最低8文字である必要があります。',
        ];
    }
}
