<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Writer>
 */
class WriterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'user_id' => function () {
            $user = User::factory()->create();
            return $user->id;
        },
            'name' => $this->faker->name,
            'image_url' => $this->faker->imageUrl(150, 120, 'people', true)
        ];
    }

}
