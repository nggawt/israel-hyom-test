<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use DateTimeInterface;

class Writer extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id','name', 'image_url'
    ];
    
    /**
      *  * Prepare a date for array / JSON serialization.
      *   *
      *    * @param  \DateTimeInterface  $date
      *     * @return string
      *      */
    protected function serializeDate(DateTimeInterface $date)
    {
          return $date->format('Y-m-d H:i:s');
    }
		
		public function user(){
      return $this->belongsTo(User::class);
    }
    
    public function posts(){
      return $this->hasMany(Post::class);
    }

}
