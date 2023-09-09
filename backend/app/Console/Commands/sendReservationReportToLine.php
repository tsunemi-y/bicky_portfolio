<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\LineMessengerServices;

class sendReservationReportToLine extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'line:report';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '月の予約情報をラインに送信';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(private LineMessengerServices $lineMessengerServices)
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->lineMessengerServices->sendReservationReport();
    }
}
