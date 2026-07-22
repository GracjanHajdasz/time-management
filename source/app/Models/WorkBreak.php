<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WorkBreak extends Model
{
    public function workSession(): BelongsTo {
        return $this->belongsTo(WorkSession::class);
    }
}
