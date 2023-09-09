<?php

namespace App\Http\Requests\Admins;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class CreateAvailableFormRequest extends FormRequest
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
            'datetime'  => [
                'required',
                function ($attribute, $value, $fail) {
                    $format1 = 'Y-m-d';
                    $format2 = 'Y-m';
                    $date1 = \DateTime::createFromFormat($format1, $value);
                    $date2 = \DateTime::createFromFormat($format2, $value);

                    if (($date1 === false || $date1->format($format1) !== $value)
                        && ($date2 === false || $date2->format($format2) !== $value)) {
                        $fail('指定する日付の形式は、Y-m-dかY-mにしてください。');
                    }
                }
            ],
        ];
    }

    public function messages()
    {
        return [
            'datetime.required'  => '利用可能日時をご入力ください',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $response['errors']  = $validator->errors()->toArray();
        throw new HttpResponseException(response()->json($response, 422));
    }
}
