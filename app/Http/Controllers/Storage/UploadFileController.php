<?php

declare(strict_types=1);

namespace App\Http\Controllers\Storage;

use App\Enums\AlertType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Sotrage\UploadFileRequest;
use App\Models\File;
use App\Repositories\FileRepository;
use App\Services\UploadFile\UploadFileManagerInterface;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class UploadFileController extends Controller
{
    public function __construct(
        private readonly UploadFileManagerInterface $fileManager,
        private readonly FileRepository $fileRepository
    )
    {
    }

    public function index(): Response
    {
        return Inertia::render('Storage/Index', [
            'recentFiles' => $this->fileRepository->recentFiles()
        ]);
    }

    public function store(UploadFileRequest $request): RedirectResponse
    {
        $file = $request->file('file');

        try {
            $this->fileManager->upload($file);
        } catch (\Exception $e) {
            Log::error($e->getMessage(), ['class' => __CLASS__, 'method' => __FUNCTION__]);

            return back()->with(self::message(AlertType::DANGER, 'Uploading file error'));
        }

        return back()->with(self::message(AlertType::SUCCESS, 'Uploading file has started'));
    }

    public function destroy(File $file): RedirectResponse
    {
        try {
            $this->fileManager->delete($file);
        } catch (\Exception $e) {
            Log::error($e->getMessage(), ['class' => __CLASS__, 'method' => __FUNCTION__]);

            return back()->with(self::message(AlertType::DANGER, 'Deleting file error'));
        }

        return back()->with(self::message(AlertType::SUCCESS, 'Deleting file has started'));
    }
}
