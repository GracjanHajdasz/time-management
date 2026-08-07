<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\WorkSession;
use App\Models\WorkBreak;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DemoDataSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::factory()->create([
            'name' => 'Admin Demo',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
        ]);

        $admin->assignRole('admin');


        $employees = User::factory(10)->create()
            ->each(function ($user) {

                $user->assignRole('employee');


                for ($i = 1; $i <= 10; $i++) {

                    $start = Carbon::now()
                        ->subDays($i)
                        ->setHour(8)
                        ->setMinute(rand(0, 30));


                    $end = (clone $start)
                        ->addHours(8)
                        ->addMinutes(rand(0, 30));


                    $session = WorkSession::create([
                        'user_id' => $user->id,
                        'started_at' => $start,
                        'ended_at' => $end,
                        'note' => 'Normalny dzień pracy',
                    ]);


                    WorkBreak::create([
                        'work_session_id' => $session->id,
                        'started_at' => (clone $start)->addHours(4),
                        'ended_at' => (clone $start)->addHours(4)->addMinutes(30),
                    ]);
                }
            });
    }
}