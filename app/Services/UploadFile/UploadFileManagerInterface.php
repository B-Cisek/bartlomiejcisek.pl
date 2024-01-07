<?php

namespace App\Services\UploadFile;

use Illuminate\Http\UploadedFile;

interface UploadFileManagerInterface
{
    public function upload(UploadedFile $file): void;
}
