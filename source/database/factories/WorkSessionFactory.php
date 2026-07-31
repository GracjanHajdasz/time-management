<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\WorkSession;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<WorkSession>
 */
class WorkSessionFactory extends Factory
{
    protected $model = WorkSession::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),

            'started_at' => now()->subHours(8),

            'ended_at' => now(),

            'note' => null,
        ];
    }

    /**
     * Active work session (user is currently working)
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'ended_at' => null,
        ]);
    }

    /**
     * Work session from X days ago
     */
    public function fromDaysAgo(int $days): static
    {
        return $this->state(fn (array $attributes) => [
            'started_at' => now()
                ->subDays($days)
                ->subHours(8),

            'ended_at' => now()
                ->subDays($days),
        ]);
    }
}