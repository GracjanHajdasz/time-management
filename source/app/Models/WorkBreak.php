<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['started_at', 'ended_at'])]
class WorkBreak extends Model
{
    public function workSession(): BelongsTo {
        return $this->belongsTo(WorkSession::class);
    }
}
