<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property string chunk_name
 * @property string discord_message_id
 * @property string url
 * @property string file_id
 * @property \DateTime uploaded_at
 * @property \DateTime deleted_at
 */
class Chunk extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'uploaded_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    public $timestamps = false;

    public function file(): BelongsTo
    {
        return $this->belongsTo(File::class);
    }
}
