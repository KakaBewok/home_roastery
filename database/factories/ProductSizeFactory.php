<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Product;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductSize>
 */
class ProductSizeFactory extends Factory
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
            'price' => $this->faker->randomFloat(2, 10000, 300000),
            'original_price' => 0,
            'unit' => $this->faker->randomElement(['Gram', 'Kilogram']),
            'stock' => $this->faker->numberBetween(1, 100),
            'size' => $this->faker->randomElement(['200', '500', '3']),
        ];
    }
}
