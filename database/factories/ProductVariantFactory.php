<?php

namespace Database\Factories;

use App\Models\Product;
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
            'product_id' => Product::factory(),
            'size' => $this->faker->randomElement(['200gr', '250gr', '100gr', '1kg']),
            'type' => $this->faker->randomElement(['Coarse', 'Medium', 'Fine']),
            'color' => $this->faker->safeColorName(),
            'price' => $this->faker->randomFloat(2, 500000, 4000000),
            'original_price' => $this->faker->randomFloat(2, 600000, 6000000),
            'stock' => $this->faker->numberBetween(0, 110),
        ];
    }
}
