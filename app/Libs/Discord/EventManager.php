<?php

declare(strict_types=1);

namespace App\Libs\Discord;

use Discord\Discord;
use ReflectionClass;

class EventManager
{
    private const string PATH = __DIR__ . DIRECTORY_SEPARATOR . 'Actions';
    private array $actions;

    public function __construct(private readonly Discord $discord)
    {
    }

    public function handle(): void
    {
        $files = scandir(self::PATH);

        foreach ($files as $file) {
            $filePath = self::PATH. DIRECTORY_SEPARATOR . $file;

            if (is_file($filePath) && pathinfo($filePath, PATHINFO_EXTENSION) === 'php') {
                $namespace = __NAMESPACE__ . '\\' . 'Actions' . '\\' . pathinfo($filePath, PATHINFO_FILENAME);

                $reflection = new ReflectionClass($namespace);

                if ($reflection->implementsInterface(DiscordEventAction::class)) {
                    (new $namespace($this->discord))->run();
                }
            }
        }

    }
}
