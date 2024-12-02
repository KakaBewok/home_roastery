<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'order_date' => now(),
            'status' => $this->faker->randomElement(['Paid', 'Pending', 'Cancelled']),
            'total_amount' => $this->faker->randomFloat(2, 10000, 300000),
            'shipping_address' => $this->faker->sentence(15, true),
        ];
    }
}
