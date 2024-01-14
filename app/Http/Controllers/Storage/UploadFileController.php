<?php

declare(strict_types=1);

namespace App\Http\Controllers\Storage;

use App\Enums\AlertType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Sotrage\UploadFileRequest;
use App\Models\File;
use App\Services\UploadFile\UploadFileManagerInterface;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class UploadFileController extends Controller
{
    public function __construct(private readonly UploadFileManagerInterface $fileManager)
    {
    }

    public function index(): Response
    {
        return Inertia::render('Storage/Index', [
            'recentFiles' => File::with('user')->orderBy('uploaded_at', 'desc')->take(10)->get()
        ]);
    }

    public function store(UploadFileRequest $request): RedirectResponse
    {
        $file = $request->file('file');
        /** save the file temporarily */
        $file->store('temp');

        try {
            $this->fileManager->upload($file);
        } catch (\Exception $e) {
            Log::error($e->getMessage(), ['class' => __CLASS__]);

            return back()->with(self::message(AlertType::DANGER, 'Uploading file error'));
        }

        return back()->with(self::message(AlertType::SUCCESS, 'Uploading file has started'));
    }
}
