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
        Schema::create('offers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('business_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->string('investor');
            $table->bigInteger('amount');
            $table->float('equity', 3);
            $table->float('postMoneyValuation', 3);
            $table->date('offerDate');
            $table->enum('status', ['pending', 'accepted', 'rejected', 'underReview']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('offers');
    }
};
