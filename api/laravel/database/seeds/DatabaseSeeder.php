<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        if (!\App\Excludes::all()->isEmpty()) {
            return;
        }

        factory(\App\Excludes::class, 50)->create();
    }
}
