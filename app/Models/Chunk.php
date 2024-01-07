<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property string file_name
 * @property \Ramsey\Uuid\Uuid file_id
 * @property \DateTime uploaded_at
 * @property \DateTime deleted_at
 */
class Chunk extends Model
{
    use HasFactory;

    protected $fillable = ['file_name', 'file_id', 'uploaded_at', 'deleted_at'];

    protected $casts = [
        'uploaded_at' => 'datetime',
        'deleted_at' => 'datetime'
    ];

    public $timestamps = false;

    public function file(): BelongsTo
    {
        return $this->belongsTo(File::class);
    }
}
