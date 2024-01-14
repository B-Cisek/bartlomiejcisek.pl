<?php

namespace App\Enums;

enum ExtensionType: string
{
    case MP4 = 'mp4';
    case ZIP = 'zip';
    case JPG = 'jpg';
    case XLSX = 'xlsx';

    public static function getValues(): array
    {
        return array_column(self::cases(), 'value');
    }
}
