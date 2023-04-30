<?php

namespace Database\Factories;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $data_inicial = Carbon::createFromDate(2023, 4, 1);
        $data_final = Carbon::createFromDate(2023, 4, 30);

        return [
            'description' => fake()->sentence(6),
            'date_conclusion' => fake()->dateTimeBetween($data_inicial, $data_final),
            'created_at' => fake()->dateTimeBetween($data_inicial, $data_final),
            'responsible_id' => User::inRandomOrder()->first()->id,
        ];
    }
}
