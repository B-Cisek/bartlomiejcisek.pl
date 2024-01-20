<?php

namespace App\Services\UploadFile;

use App\Models\File;
use Illuminate\Http\UploadedFile;

interface UploadFileManagerInterface
{
    public function upload(UploadedFile $file): void;
    public function delete(File $file): void;
}
