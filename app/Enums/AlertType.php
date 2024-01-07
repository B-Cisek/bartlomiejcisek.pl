<?php

namespace App\Enums;

enum AlertType: string
{
    case INFO = 'info';
    case DANGER = 'danger';
    case SUCCESS = 'success';
    case WARNING = 'warning';
}
