<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained(
                table: 'categories',
                indexName: 'products_category_id'
            )->onDelete('cascade');
            $table->string("name");
            $table->text("description")->nullable();
            $table->unsignedBigInteger('price');
            $table->string('unit');
            $table->integer('stock');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
