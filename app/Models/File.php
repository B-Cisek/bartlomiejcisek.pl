<?php

namespace App\Models;

use App\Enums\ExtensionType;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property string file_name
 * @property string origin_file_name
 * @property int file_size
 * @property ExtensionType extension
 * @property \DateTime uploaded_at
 * @property \DateTime deleted_at
 * @property int user_id
 */
class File extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'file_name',
        'origin_file_name',
        'file_size',
        'extension',
        'user_id',
        'uploaded_at',
        'deleted_at'
    ];

    protected $casts = [
        'extension' => ExtensionType::class,
        'uploaded_at' => 'datetime',
        'deleted_at' => 'datetime'
    ];

    public $timestamps = false;

    public function chunks(): HasMany
    {
        return $this->hasMany(Chunk::class);
    }
}
