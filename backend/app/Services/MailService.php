<?php

namespace App\Services;

use Illuminate\Support\Facades\Mail;

class MailService
{
    /**
     * 利用者へのメール
     * @param $param
     */
    public function sendMailToUser($params, $viewFile, $subject, $attachFile = null)
    {
        // メールデータ作成
        $mailData = [];
        foreach ($params as $key => $value) {
            $mailData[$key] = $value;
        };

        Mail::send(
            ['text' => $viewFile],
            $mailData,
            function ($message) use ($params, $subject, $attachFile) {
                if (!empty($attachFile)) {
                    $message
                        ->to($params['email'])
                        ->subject($subject)
                        ->attach(storage_path($attachFile));
                } else {
                    $message
                        ->to($params['email'])
                        ->subject($subject);
                }
            }
        );
    }
}
