<?php

declare(strict_types=1);

namespace App\Services\UploadFile;

use App\Enums\ExtensionType;
use App\Jobs\Storage\UploadFileToDiscord;
use App\Models\File;
use App\Services\FileSplitter\FileSize;
use App\Services\FileSplitter\FileSplitterService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;

class DiscordUploadFileManager implements UploadFileManagerInterface
{
    public const int MAX_FILE_SIZE = 15;

    public function upload(UploadedFile $file): void
    {
        $size = new FileSize($file->getSize());
        $storageFileName = $this->storeFileTemporary($file);
        $fileModel = $this->saveToDataBase($file, $storageFileName);
        $files[] = $storageFileName;

        if ($size->getSizeInMegabytes() > self::MAX_FILE_SIZE) {
            $chunkFileNames = (new FileSplitterService($fileModel))
                ->split()
                ->getChunks();

            $files = [...$files, ...$chunkFileNames];
        }

        UploadFileToDiscord::dispatch($files);
    }

    private function storeFileTemporary(UploadedFile $file): string
    {
        $path = $file->store('files');

        return str_replace('files/', '', $path);
    }

    private function saveToDataBase(UploadedFile $file, string $fileName): File
    {
        $model = new File();
        $model->file_name = str_replace('files/', '', $fileName);
        $model->origin_file_name = $file->getClientOriginalName();
        $model->file_size = $file->getSize();
        $model->extension = ExtensionType::from($file->getClientOriginalExtension());
        $model->user_id = Auth::id();
        $model->uploaded_at = now();
        $model->save();

        return $model;
    }
}
