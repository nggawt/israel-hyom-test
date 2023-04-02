<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'writer_id', 'title', 'content', 'url'
    ];
		
		public function writer(){
      return $this->belongsTo(Writer::class);
    }
    
}
