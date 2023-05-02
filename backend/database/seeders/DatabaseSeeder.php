<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        \App\Models\User::factory()->create([
            'name' => 'Administrador',
            'email' => 'admin@gmail.com',
            'password' => '12345678',
        ]);


        \App\Models\User::factory(30)->create();
        \App\Models\Task::factory(100)->create();
    }
}
