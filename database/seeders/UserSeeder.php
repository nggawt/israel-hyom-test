<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

			DB::table('users')->truncate();

      $users = [
      	["name" => "admin", "email" => "admin@gmail.com", "password" => bcrypt("admin")],
      	["name" => "jhon", "email" => "jhon@gmail.com", "password" => bcrypt("jhon")],
      ];
      DB::table('users')->insert($users);
    }
}
