<?php

declare(strict_types=1);

namespace App\Services\FileSplitter;

use App\Models\Chunk;
use App\Models\File;
use Illuminate\Support\Facades\Process;

class FileSplitterService implements FileSplitterInterface
{
    private array $chunks = [];

    public function __construct(private readonly File $file, private int $chunkSize = 25)
    {
    }

    public function split(): self
    {
        $result = Process::path(storage_path('app/files'))->run($this->prepareSplitCommand());

        if ($result->successful()) {
            $result = Process::path(storage_path('app/files'))->run('ls');
            $this->chunks = explode(PHP_EOL, $result->output());
            $this->saveChunks();
        }

        return $this;
    }

    public function getChunks(): array
    {
        return $this->chunks;
    }

    public function join()
    {
       // $result = Process::path(storage_path('app/files'))->run($this->prepareJoinCommand($path));
    }

    public function setChunkSize(int $size): void
    {
        $this->chunkSize = $size;
    }

    public function getChunkSize(): int
    {
        return $this->chunkSize;
    }

    public function getFileName(bool $extension = true): string
    {
        if ($extension) {
            return $this->file->getClientOriginalName() . '.' . $this->file->getClientOriginalExtension();
        }

        return $this->file->getFilename();
    }

    public function getFileSize(): FileSize|null
    {
        $fileSize = $this->file->getSize();

        if ($fileSize) {
            return new FileSize($this->file->getSize());
        }

        return null;
    }

    private function prepareSplitCommand(): string
    {
        return sprintf(
            'split -b %dM %s %s_', $this->getChunkSize(), $this->file->file_name, $this->file->id
        );
    }

    private function prepareJoinCommand(): string
    {
        return sprintf(
            'cat chunk_* > combined_video.mp4',

        );
    }

    private function saveChunks(): void
    {
        $this->formatChunks();

        foreach ($this->chunks as $chunk) {
            $this->file->chunks()->create([
                'file_name' => $chunk,
                'uploaded_at' => now()
            ]);
        }
    }

    private function formatChunks(): void
    {
        foreach ($this->chunks as $key => $chunk) {
            if (empty($chunk) || $chunk === $this->file->file_name) {
                unset($this->chunks[$key]);
            }
        }
    }
}
