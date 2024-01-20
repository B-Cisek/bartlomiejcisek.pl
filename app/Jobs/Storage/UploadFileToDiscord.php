<?php

declare(strict_types=1);

namespace App\Jobs\Storage;

use App\Libs\API\DiscordApi;
use App\Models\File;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
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
        try {
            foreach ($this->fileNames as $key => $path) {
                $file = fopen(storage_path('app/temp/'.$path), 'r');

                $object = DiscordApi::sendMessage($key, $file);

                fclose($file);

                if (count($this->fileNames) === 1) {
                    $this->fileModel->update([
                        'uploaded_at' => now(),
                        'discord_message_id' => $object->id,
                        'url' => $object->attachments[0]->url,
                    ]);
                } else {
                    $this->fileModel
                        ->chunks()
                        ->where('chunk_name', $path)
                        ->update([
                            'url' => $object->attachments[0]->url,
                            'discord_message_id' => $object->id,
                            'uploaded_at' => now(),
                        ]);

                    $this->fileModel->update(['uploaded_at' => now()]);
                }
            }
        } catch (\Exception $e) {
            Log::error($e->getMessage(), ['class' => __CLASS__]);
            // TODO: handle fail upload
        } finally {
            Storage::deleteDirectory('temp');
        }
    }
}
