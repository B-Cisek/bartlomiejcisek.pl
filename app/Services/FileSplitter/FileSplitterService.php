<?php

declare(strict_types=1);

namespace App\Services\FileSplitter;

use App\Exceptions\FailedToJoinTheChunks;
use App\Exceptions\FailedToSplitTheFile;
use App\Models\File;
use Illuminate\Support\Facades\Process;

class FileSplitterService implements FileSplitterInterface
{
    private array $chunks = [];
    private string $storagePath;

    public function __construct(
        private readonly File $fileModel,
        private readonly ?string $temporaryFilename,
        private readonly int $chunkSize = 25
    )
    {
        $this->storagePath = storage_path('app/temp');
    }

    public function split(): self
    {
        $result = Process::path($this->storagePath)->run($this->prepareSplitCommand());

        if (! $result->successful()) {
            throw new FailedToSplitTheFile();
        }

        $this->setChunks();

        return $this;
    }

    public function join(): self
    {
        $result = Process::path(storage_path('app/files'))->run($this->prepareJoinCommand());

        if (! $result->successful()) {
            throw new FailedToJoinTheChunks();
        }

        return $this;
    }

    public function getCombinedFileName(bool $withExtension = true): string
    {
        if (! $withExtension) {
            return $this->fileModel->origin_file_name;
        }

        return $this->fileModel->origin_file_name . '.' . $this->fileModel->extension->value;
    }

    private function setChunks(): void
    {
        $result = Process::path($this->storagePath)->run('ls -S');
        $this->chunks = explode(PHP_EOL, $result->output());
        $this->saveChunks();
    }

    public function getChunks(): array
    {
        return $this->chunks;
    }

    private function prepareSplitCommand(): string
    {
        return sprintf(
            'split -b %dM %s %s_', $this->chunkSize, $this->temporaryFilename, $this->fileModel->id
        );
    }

    private function prepareJoinCommand(): string
    {
        return sprintf(
            'cat %s_* > %s.%s',
            $this->fileModel->id,
            $this->fileModel->origin_file_name,
            $this->fileModel->extension->value
        );
    }

    private function formatChunks(): void
    {
        array_shift($this->chunks);

        foreach ($this->chunks as $key => $chunk) {
            if (empty($chunk)) {
                unset($this->chunks[$key]);
            }
        }
    }

    private function saveChunks(): void
    {
        $this->formatChunks();

        foreach ($this->chunks as $chunk) {
            $this->fileModel->chunks()->create([
                'chunk_name' => $chunk,
                'uploaded_at' => now()
            ]);
        }
    }
}
