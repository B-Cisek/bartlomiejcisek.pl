<?php

namespace App\Jobs\Storage;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Http\Client\Pool;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
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
        $responses = Http::pool(fn (Pool $pool) => collect($this->messageIds)
            ->map(fn (string $id) => $pool
                ->timeout(60)
                ->baseUrl(config('services.discord.base_url'))
                ->withToken(config('services.discord.token'), 'Bot')
                ->delete('channels/' . config('services.discord.channel_id') . '/messages/' . $id))
        );
    }
}
