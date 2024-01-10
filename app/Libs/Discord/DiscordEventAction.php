<?php

namespace App\Libs\Discord;

use Discord\Discord;

interface DiscordEventAction
{
    public function __construct(Discord $discord);

    public function run();
}
