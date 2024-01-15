<?php

declare(strict_types=1);

namespace App\Jobs\Storage;

use App\Models\File;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class UploadFileToDiscord implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(private readonly array $fileNames, private readonly File $fileModel)
    {
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        foreach ($this->fileNames as $key => $path) {
            $file = fopen(storage_path('app/temp/' . $path), 'r');

            $response = Http::timeout(60 * 3)
                ->asMultipart()
                ->baseUrl(config('services.discord.base_url'))
                ->withToken(config('services.discord.token'), 'Bot')
                ->attach("files[{$key}]", $file)
                ->post('channels/' . config('services.discord.channel_id') . '/messages');

            $obj = $response->object();

            if (count($this->fileNames) == 1) {
                $this->fileModel->update([
                    'uploaded_at' => now(),
                    'discord_message_id' => $obj->id,
                    'url' => $obj->attachments[0]->url
                ]);
            } else {
                $this->fileModel
                    ->chunks()
                    ->where('chunk_name', $path)
                    ->update([
                        'url' => $obj->attachments[0]->url,
                        'discord_message_id' => $obj->id,
                    ]);
            }
        }

        Storage::deleteDirectory('temp');
    }
}
