<?php

declare(strict_types=1);

namespace App\Services\UploadFile;

use App\Enums\ExtensionType;
use App\Jobs\Storage\DeleteFileFromDiscord;
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

    public function delete(File $file): void
    {
        if ($file->chunks()->count()) {
            DeleteFileFromDiscord::dispatch($file->chunks()->pluck('discord_message_id')->toArray());
        } else {
            DeleteFileFromDiscord::dispatch([$file->discord_message_id]);
        }
    }

    private function saveFileTemporarily(UploadedFile $file): void
    {
        $file->store('temp');
    }

    private function saveFileModel(UploadedFile $uploadedFile): File
    {
        $file = new File();
        $file->origin_file_name = $uploadedFile->getClientOriginalName();
        $file->file_size = $uploadedFile->getSize();
        $file->extension = ExtensionType::from($uploadedFile->getClientOriginalExtension());
        $file->save();

        return $file;
    }
}
