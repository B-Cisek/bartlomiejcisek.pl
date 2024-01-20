<?php

namespace App\Jobs\Storage;

use App\Libs\API\DiscordApi;
use App\Models\Chunk;
use App\Models\File;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class DeleteFileFromDiscord implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(private readonly array $messageIds)
    {
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $responses = DiscordApi::deleteMessage($this->messageIds);

        // TODO: refactor
        if (count($this->messageIds) === 1) {
            File::where('discord_message_id', $this->messageIds[0])->first()->update(['deleted_at' => now()]);
        } else {
            foreach ($this->messageIds as $id) {
                $chunk = Chunk::where('discord_message_id', $id)->first();
                $chunk->update(['deleted_at' => now()]);
                $chunk->file()->update(['deleted_at' => now()]);
            }
        }

        foreach ($responses as $response) {
            if (! $response->noContent()) {
                Log::error('Filed to delete files');
                // TODO: handle
            }
        }

        // TODO: end refactor
    }
}
