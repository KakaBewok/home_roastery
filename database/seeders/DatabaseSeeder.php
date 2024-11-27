<?php

namespace Database\Seeders;

use App\Models\Cart;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\CartItem;
use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\PaymentMethod;
use App\Models\Photo;
use App\Models\Product;
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
        //Review - 5 
        //Order - 5 
        //PaymentMethod - 3 
        //Shipping -5 
        //Payment -5 

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
        Review::factory(5)->recycle([
            User::all(),
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
    }
}
