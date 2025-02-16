<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $productName = ['Bomber Candy', 'Karameelaa', 'Sepakung Triplekill', 'Super Carbonic', 'Ranca Bali', 'Sang Arjuna', 'Luwak Wild Selection', 'Aceh Gayo Heritage', 'Kintamani Bali', 'Toraja Sulawesi', 'Java Preanger', 'Mandailing Sumatra', 'Flores Bajawa', 'Wamena Papua', 'Lombok Sembalun'];

        return [
            'category_id' => Category::factory(),
            'name' => $this->faker->unique()->randomElement($productName),
            'description' => $this->faker->randomElement(['Description test', 'This is a description of product', '-']),
            'is_publish' => $this->faker->boolean(80),
        ];
    }
}
