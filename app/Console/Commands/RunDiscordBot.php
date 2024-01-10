<?php

namespace App\Console\Commands;

use App\Libs\Discord\Bot;
use Illuminate\Console\Command;

class RunDiscordBot extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bot:run';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command to run the discord bot';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        Bot::getInstance()->discord()->run();

        return Command::SUCCESS;
    }
}
