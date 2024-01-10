<?php

namespace App\Libs\Discord\Actions;

use App\Libs\Discord\DiscordEventAction;
use Discord\Discord;

readonly class MessageCreate implements DiscordEventAction
{
    public function __construct(private Discord $discord)
    {
    }

    public function run(): void
    {
        //
    }
}
