<?php

namespace Database\Factories;

use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ShippingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'order_id' => Order::factory(),
            'shipping_method' => $this->faker->randomElement(['Express', 'Standard']),
            'tracking_number' => fake()->regexify('[A-Z]{2}[0-9]{8}[A-Z]{2}'),
            'shipping_cost' => $this->faker->randomFloat(2, 10000, 100000),
            'status' => $this->faker->randomElement(['Pick up', 'In transit', 'Delivered', 'Failed']),
        ];
    }
}
