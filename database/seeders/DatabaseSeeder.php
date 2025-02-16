<?php

namespace Database\Seeders;

use App\Models\Banner;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\PaymentMethod;
use App\Models\Photo;
use App\Models\Product;
use App\Models\ProductSize;
use App\Models\ProductVariant;
use App\Models\Rating;
use App\Models\Review;
use App\Models\Shipping;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //Product - 15 
        //Category - 3 
        //Photo - 30 
        //Cart - 2 
        //CartItem - 5 
        //OrderItem - 10
        //Order - 5 
        //PaymentMethod - 3 
        //Shipping -5 
        //Payment -5 
        //User - 4
        //Banner - 2
        //Rating - 5
        //Review - 5
        //ProductSize - 3
        //ProductVariant - 3

        User::create([
            'name' => 'Super Admin',
            'email' => 'super.admin@gmail.com',
            'password' => Hash::make('superadmin'),
        ]);
        User::create([
            'name' => 'Customer',
            'email' => 'customer@gmail.com',
            'password' => Hash::make('customer'),
        ]);
        User::create([
            'name' => 'Customer 2',
            'email' => 'customer2@gmail.com',
            'password' => Hash::make('customer2'),
        ]);
        User::create([
            'name' => 'Customer 3',
            'email' => 'customer3@gmail.com',
            'password' => Hash::make('customer3'),
        ]);
        User::create([
            'name' => 'Customer 4',
            'email' => 'customer4@gmail.com',
            'password' => Hash::make('customer4'),
        ]);

        Banner::factory(2)->create();
        Category::factory(3)->create();
        PaymentMethod::factory(3)->create();
        Product::factory(15)->recycle([
            Category::all()
        ])->create();
        Photo::factory(30)->recycle([
            Product::all()
        ])->create();
        Cart::factory(2)->recycle([
            User::all()
        ])->create();
        CartItem::factory(5)->recycle([
            Cart::all(),
            Product::all()
        ])->create();
        Order::factory(5)->recycle([
            User::all()
        ])->create();
        OrderItem::factory(10)->recycle([
            Order::all(),
            Product::all()
        ])->create();
        Shipping::factory(5)->recycle([
            Order::all(),
        ])->create();
        Payment::factory(5)->recycle([
            Order::all(),
            PaymentMethod::all()
        ])->create();

        Product::all()->each(function ($product) {
            Rating::factory(5)->create([
                'product_id' => $product->id,
                'user_id' => User::inRandomOrder()->first()->id,
            ]);

            Review::factory(5)->create([
                'product_id' => $product->id,
                'user_id' => User::inRandomOrder()->first()->id,
            ]);

            ProductSize::factory(3)->create([
                'product_id' => $product->id,
            ])->each(function ($productSize) {
                ProductVariant::factory(3)->create([
                    'product_size_id' => $productSize->id,
                ]);
            });
        });
    }
}
