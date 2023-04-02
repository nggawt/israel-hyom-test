<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use App\Models\Writer;
use App\Models\Post;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('posts')->truncate();
        
        $writers = Writer::all()->each(function($writer){
        	$appUrl = env("APP_URL", "http://localhost");
        
        	Post::factory(5)->for($writer)->create([
        		"writer_id" => $writer->id,
        		"url" => $appUrl
        	]);
    	});
      
    }
}
