<?php

namespace App\Exceptions;

use Exception;

class FailedToSplitTheFile extends Exception
{
    protected $message = 'Failed to split the file into chunks';
}
