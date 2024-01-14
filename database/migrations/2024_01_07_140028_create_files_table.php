<?php

use App\Enums\ExtensionType;
use App\Models\User;
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
        Schema::create('files', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('discord_message_id')->nullable();
            $table->string('url')->nullable();
            $table->string('origin_file_name');
            $table->unsignedBigInteger('file_size');
            $table->enum('extension', ExtensionType::getValues());
            $table->foreignIdFor(User::class)->constrained();
            $table->timestamp('uploaded_at');
            $table->timestamp('deleted_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('files');
    }
};
