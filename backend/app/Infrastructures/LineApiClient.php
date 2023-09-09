<?php

namespace App\Infrastructures;

use LINE\LINEBot;
use LINE\LINEBot\HTTPClient\CurlHTTPClient;
use LINE\LINEBot\MessageBuilder\TextMessageBuilder;

class LineApiClient
{
    private $bot;
    
    public function __construct()
    {
        $httpClient = new CurlHTTPClient(config('services.line.channel_token'));
        $this->bot = new LINEBot($httpClient, ['channelSecret' => config('services.line.messenger_secret')]);
    }

    public function sendMessage($userId, $message)
    {
        $textMessageBuilder = new TextMessageBuilder($message);
        $this->bot->pushMessage($userId, $textMessageBuilder);
    }
}
