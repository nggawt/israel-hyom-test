<?php

namespace App\Http\Controllers;

use App\Models\Writer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class WriterController extends Controller
{
    protected $validationProps = [
            'user_id' => 'numeric',
    				'name' => 'string',
    				'image_url' => 'url'
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

        // get validate input
        $validated = $validator->validated();

        // set pagination per page query variable
        $perPage = isset($validated['per_page']) ? $validated['per_page'] : 20;
        
        //return response with records ordered alphabeticly
        return response(['writers' => Writer::orderBy('name', 'asc')->paginate($perPage)], 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Writer $writer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Writer $writer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Writer $writer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Writer $writer)
    {
        //
    }
}
