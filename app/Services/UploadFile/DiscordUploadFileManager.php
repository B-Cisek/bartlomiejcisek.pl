<?php

declare(strict_types=1);

namespace App\Services\UploadFile;

use App\Enums\ExtensionType;
use App\Jobs\Storage\UploadFileToDiscord;
use App\Models\File;
use App\Services\FileSplitter\FileSize;
use App\Services\FileSplitter\FileSplitterService;
use Illuminate\Http\UploadedFile;

class DiscordUploadFileManager implements UploadFileManagerInterface
{
    public const int MAX_FILE_SIZE = 25;

    public function upload(UploadedFile $file): void
    {
        $this->saveFileTemporarily($file);

        $fileModel = $this->saveFileModel($file);

        $files[] = $file->hashName();

        $size = (new FileSize($file->getSize()))->getSizeInMegabytes();

        if ($size > self::MAX_FILE_SIZE) {
            $chunkFileNames = (new FileSplitterService($fileModel, $file->hashName()))
                ->split()
                ->getChunks();

            $files = $chunkFileNames;
        }

        UploadFileToDiscord::dispatch($files, $fileModel);
    }

    private function saveFileTemporarily(UploadedFile $file): void
    {
        $file->store('temp');
    }

    private function saveFileModel(UploadedFile $fileToUpload): File
    {
        $file = new File();
        $file->origin_file_name = $fileToUpload->getClientOriginalName();
        $file->file_size = $fileToUpload->getSize();
        $file->extension = ExtensionType::from($fileToUpload->getClientOriginalExtension());
        $file->uploaded_at = now();
        $file->user_id = auth()->id();
        $file->save();

        return $file;
    }
}
