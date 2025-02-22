<?php

namespace Database\Factories;

use App\Models\ProductSize;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductVariant>
 */
class ProductVariantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_size_id' => ProductSize::factory(),
            'type' => $this->faker->randomElement(['Fine', 'Normal', 'Coarse']),
            'price' => $this->faker->randomFloat(2, 30000, 70000),
            'original_price' => $this->faker->optional()->randomFloat(2, 70000, 90000),
            'stock' => $this->faker->numberBetween(1, 3),
        ];
    }
}
