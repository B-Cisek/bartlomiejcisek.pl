<?php

namespace App\Exceptions;

use Exception;

class FailedToJoinTheChunks extends Exception
{
    protected $message = 'Failed to join the chunks';
}
