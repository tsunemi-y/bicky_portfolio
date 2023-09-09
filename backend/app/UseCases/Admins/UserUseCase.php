<?php

namespace App\UseCases\Admins;

use App\Services\UserService;
use App\Services\FileService;
use App\Services\MailService;

class UserUseCase
{
    public function __construct(
        private UserService $userService,
        private MailService $mailService, 
        private FileService $fileService,
    ) 
    {    
    }

    public function sendReceipt($name, $email, $fee)
    {
        $args = [
            "name"  => $name,
            "email" => $email,
            "fee"   => $fee,
        ];

        $date = date('Ymd');
        $viewFile = 'admin.emails.receipt';
        $subject = '領収書のご送付';
        $attachFile = "app/領収書_{$date}.pdf";
        $PDFView = 'admin/emails/receiptPdf';

        $this->fileService->putPDF($args, $PDFView, $attachFile);

        // 領収書送信
        $this->mailService->sendMailToUser($args, $viewFile, $subject, $attachFile);

        // 領収書削除
        $this->fileService->delete($attachFile);
    }

    public function sendEvaluation($request)
    {
        // パラメータ設定
        $args = [
            "name"  => $request->name,
            "email" => $request->email,
        ];

        $fileName = $request->file('file')->getClientOriginalName();
        $this->fileService->putRequestedFile($request, $fileName);

        $viewFile = 'admin.emails.evaluation';
        $subject = '評価表のご送付';
        $attachFile = "app/{$fileName}";

        // 評価表送信
        $this->mailService->sendMailToUser($args, $viewFile, $subject, $attachFile);

        // 評価表削除
        $this->fileService->delete($attachFile);
    }
}
