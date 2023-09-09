<?php

namespace App\Strategies\Reservation\Insert;

use App\Strategies\Reservation\Insert\Interfaces\InsertStrategyInterface;

class InsertStrategy
{
   private $insert;

    public function __construct(InsertStrategyInterface $insert)
    {
        $this->insert = $insert;
    }

    public function insert()
    {
        $this->insert->insert();
    }
}
