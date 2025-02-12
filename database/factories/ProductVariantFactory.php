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
            'color' => $this->faker->safeColorName(),
            'type' => $this->faker->randomElement(['Fine', 'Normal', 'Coarse']),
            'price' => $this->faker->randomFloat(2, 10000, 200000),
            'original_price' => $this->faker->optional()->randomFloat(2, 20000, 250000),
            'stock' => $this->faker->numberBetween(1, 100),
        ];
    }
}
