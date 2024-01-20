<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\File;
use Illuminate\Database\Eloquent\Collection;

class FileRepository extends File
{
    protected $table = 'files';

    public function recentFiles(): Collection
    {
        return self::with('user')
            ->whereNotNull('uploaded_at')
            ->whereNull('deleted_at')
            ->orderBy('uploaded_at', 'desc')
            ->take(10)
            ->get();
    }
}
