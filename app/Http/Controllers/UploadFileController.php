<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Enums\AlertType;
use App\Http\Requests\UploadFileRequest;
use App\Services\UploadFile\UploadFileManager;
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
        return Inertia::render('Storage/Index');
    }

    public function store(UploadFileRequest $request): RedirectResponse
    {
        $attributes = $request->validated();

        try {
            $this->fileManager->upload($attributes['file']);
        } catch (\Exception $e) {
            Log::error($e->getMessage());

            return back()->with([
                'alertType' => AlertType::DANGER,
                'alertMessage' => 'Uploading file error'
            ]);
        }

        return back()->with([
            'alertType' => AlertType::SUCCESS,
            'alertMessage' => 'Uploading file has started'
        ]);
    }
}
