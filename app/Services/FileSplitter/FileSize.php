<?php

declare(strict_types=1);

namespace App\Services\FileSplitter;

final class FileSize
{
    private readonly int $sizeInBytes;

    public function __construct(int $sizeInBytes)
    {
        if ($sizeInBytes < 0) {
            throw new \InvalidArgumentException('The file size cannot be less than 0');
        }

        $this->sizeInBytes = $sizeInBytes;
    }

    public function getSizeInKilobytes(): float
    {
        return $this->sizeInBytes / 1024;
    }

    public function getSizeInMegabytes(): float
    {
        return $this->sizeInBytes / (1024 * 1024);
    }
}
