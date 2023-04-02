<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Writer;
use App\Models\Post;
use Carbon\Carbon;

class PostController extends Controller
{
    protected $validationProps = [
            'writer_id' => 'numeric',
                    'title' => 'string',
                    'content' => 'string',
                    'url' => 'url'
    ];

    /* Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth.jwt');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // validate per_page fiald from request
        $validator = Validator::make(
            request()->only("per_page"),
            [
                'per_page' => 'numeric',
            ]
        );

        // if error return error with status code
        if ($validator->fails()) {
            return response($validator->errors(), 422);
        }

        // get validate data
        $validated = $validator->validated();


        // set last two week variable
        $lastTwoWeeks = Carbon::now()->subDays(12);

        // set pagination per page query variable
        $perPage = isset($validated['per_page']) ? $validated['per_page'] : 20;

        // check if writer has at least 3 posts and return result and che
        $qr = Post::with("writer")->whereBetween('created_at', [
             $lastTwoWeeks,
             Carbon::now()
         ])->whereHas('writer', function ($query) {
             $query->has('posts', '>=', 3);
         })->latest()->paginate($perPage)->onEachSide(2);

        // return response
        return response([
            'posts' => $qr,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // validte inputs
        $fields = $request->validate($this->validationProps);

        // get authenticated user
        $user = auth()->user();

        // if user is not a writer lets create user as a writer
        if (is_null($user->writer)) {
            Writer::create([
            'user_id' => $user->id,
            'name' => $user->name,
            'image_url' => "https://via.placeholder.com/150x120.png/00bb88?text=people+quos"
            ]);
        }
        // set a post data to a writer
        $postData = [
            'writer_id' => auth()->user()->writer->id,
            'title' => $fields['title'],
            'content' => $fields['content'],
            'url' =>$fields['url']
        ];
        //return $writerRequesData;
        // lets create a post for a writer
        Post::create($postData);

        // return post created success with status code
        return response(['status' => 'success'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }
}
