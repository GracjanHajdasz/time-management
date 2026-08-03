<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Attributes\Fillable;

class WorkBreak extends Model
{
    protected $fillable = [
        'started_at',
        'ended_at',
        'work_session_id',
    ];

    protected $casts = [
        'started_at' => 'datetime',
        'ended_at' => 'datetime',
    ];

    public function workSession(): BelongsTo {
        return $this->belongsTo(WorkSession::class);
    }
}
