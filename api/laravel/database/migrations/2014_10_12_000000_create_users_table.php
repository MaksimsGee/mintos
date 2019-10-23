<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();

            // align with symphony framework
            $table->string('username')->nullable();
            $table->string('username_canonical')->nullable();
            $table->string('email_canonical')->nullable();
            $table->integer('enabled')->default(1);
            $table->string('salt')->nullable();
            $table->timestamp('last_login')->nullable();
            $table->string('confirmation_token')->nullable();
            $table->timestamp('password_requested_at')->nullable();
            $table->string('roles')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
