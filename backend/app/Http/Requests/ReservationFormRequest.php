<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReservationFormRequest extends FormRequest
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
            'date'  => ['required', 'date_format:Y-m-d',],
            'time'  => ['required',],
        ];
    }

    public function messages()
    {
        return [
            'date.required'    => '予約日をご入力ください',
            'date.date_format' => '日付形式でご入力ください',

            'time.required'    => '予約時間をご入力ください',
        ];
    }
}
