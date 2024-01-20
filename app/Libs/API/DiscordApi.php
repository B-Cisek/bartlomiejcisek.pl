<?php

declare(strict_types=1);

namespace App\Libs\API;

use Illuminate\Http\Client\Pool;
use Illuminate\Support\Facades\Http;

class DiscordApi
{
    /**
     * @param int $key
     * @param $file resource
     */
    public static function sendMessage(int $key, $file): object
    {
        $response = Http::timeout(60 * 3)
            ->asMultipart()
            ->baseUrl(config('services.discord.base_url'))
            ->withToken(config('services.discord.token'), 'Bot')
            ->attach("files[{$key}]", $file)
            ->post('channels/' . config('services.discord.channel_id') . '/messages');

        return $response->object();
    }

    public static function deleteMessage(array $messageIds): array
    {
        return Http::pool(fn (Pool $pool) => collect($messageIds)
            ->map(fn (string $id) => $pool
                ->timeout(60)
                ->baseUrl(config('services.discord.base_url'))
                ->withToken(config('services.discord.token'), 'Bot')
                ->delete('channels/' . config('services.discord.channel_id') . '/messages/' . $id))
        );
    }
}
