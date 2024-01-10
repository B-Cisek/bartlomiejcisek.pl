<?php

declare(strict_types=1);

namespace App\Libs\Discord;

use Discord\Discord;
use Discord\WebSockets\Event;
use Discord\WebSockets\Intents;
use Exception;

final class Bot
{
    private static ?Bot $instance = null;
    private Discord $discord;

    private function __construct()
    {
        $this->initDiscord();
    }

    private function initDiscord(): void
    {
        $this->discord = new Discord([
            'token' => env('DISCORD_TOKEN'),
            'intents' => Intents::getAllIntents(),
        ]);

        $this->discord->on(Event::READY, function (Discord $discord) {
            (new EventManager($discord))->handle();
        });
    }

    public static function getInstance(): Bot
    {
        if (self::$instance === null) {
            self::$instance = new Bot();
        }

        return self::$instance;
    }

    public function discord(): Discord
    {
        return $this->discord;
    }

    public function __clone()
    {
        throw new Exception('Bot is singleton - it cannot be cloned');
    }

    public function __wakeup()
    {
        throw new Exception('Bot is singleton - it cannot be unserialized');
    }

    public function __unserialize(array $data): void
    {
        throw new Exception('Bot is singleton - it cannot be unserialized');
    }
}
