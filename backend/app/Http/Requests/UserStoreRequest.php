<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserStoreRequest extends FormRequest
{
    public function rules()
    {
        return [
            'parentName' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'tel' => 'required|numeric',
            'password' => 'required|min:8',
            'passwordConfirm' => 'required|same:password',
            'childName' => 'required|string',
            'age' => 'required|integer|min:0',
            'gender' => 'required|in:male,female',
            'diagnosis' => 'required|string',
            'siblingUse' => 'required|in:yes,no',
            'childName2' => 'nullable|required_if:siblingUse,yes|string',
            'age2' => 'nullable|required_if:siblingUse,yes|integer|min:0',
            'gender2' => 'nullable|required_if:siblingUse,yes|in:male,female',
            'diagnosis2' => 'nullable|required_if:siblingUse,yes|string',
            'postCode' => 'required|numeric',
            'address' => 'required|string',
            'lineConsultation' => 'boolean',
            'numberOfUse' => 'nullable|required_unless:lineConsultation,1|in:1,2',
            'coursePlan' => 'nullable|required_unless:lineConsultation,1|in:1,2',
            'introduction' => 'nullable|string',
            'consaltation' => 'nullable|string',
        ];
    }

    public function messages()
    {
        return [
            'parentName.required' => '保護者氏名は必須項目です。',
            'email.required' => 'メールアドレスは必須項目です。',
            'email.email' => '有効なメールアドレスを入力してください。',
            'email.unique' => '入力されたメールアドレスは既に使用されています。',
            'tel.required' => '電話番号は必須項目です。',
            'password.required' => 'パスワードは必須項目です。',
            'password.min' => 'パスワードは最低8文字である必要があります。',
            'passwordConfirm.required' => 'パスワード確認は必須項目です。',
            'passwordConfirm.same' => 'パスワードと一致しません。',
            'childName.required' => '利用児氏名は必須項目です。',
            'age.required' => '年齢は必須項目です。',
            'age.min' => '年齢は0以上で入力してください。',
            'gender.required' => '利用児性別は必須項目です。',
            'diagnosis.required' => '診断名は必須項目です。',
            'siblingUse.required' => '兄弟児での利用は必須項目です。',
            'childName2.required_if' => '第二利用児の氏名は必須項目です。',
            'age2.required_if' => '第二利用児の年齢は必須項目です。',
            'gender2.required_if' => '第二利用児の性別は必須項目です。',
            'diagnosis2.required_if' => '第二利用児の診断名は必須項目です。',
            'postCode.required' => '郵便番号は必須項目です。',
            'address.required' => '住所は必須項目です。',
            'numberOfUse.required_unless' => '月一回利用または月二回利用の選択は必須です。',
            'coursePlan.required_unless' => '平日利用または休日利用の選択は必須です。',
        ];
    }
}
