<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Rules\Boolean;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    protected $validationProps = [
      'login_at' => 'required_without:logout_at|date',
      'logout_at' => 'required_without:login_at|date',
      'loc_target' => 'regex:/^\d{1,2}\.\d{4,8},\s*\d{1,2}\.\d{4,8}$/u',
      'note' => 'string'
    ];

    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth.jwt');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $validator = Validator::make(
            request()->all(),
            [
              'monthly' => ['', new Boolean()],
              'start_at' => 'required_without:end_at|date',
              'end_at' => 'required_without:start_at|date',
            ]
        );

        if ($validator->fails()) {
            return response($validator->errors(), 422);
        }

        $validated = $validator->validated();
        $between = $this->getBetweenDate($validated);

        $users = User::whereBetween('login_at', [
          $between['start_at'],
          $between['end_at']
        ])->latest()->paginate(10)->onEachSide(2);

        return response([
          'users' => $users,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $fields = $request->validate($this->validationProps);
        $userRequesData = [
          'user_id' => auth()->id(),
          'login_at' => $fields['login_at'],
          'logout_at' => $fields['logout_at'],
          'is_login' => isset($fields['is_login']) ?? $fields['is_login']
        ];
        if (isset($fields['loc_target'])) {
            $userRequesData['loc_target'] = $fields['loc_target'];
        }

        $userRequesData['total'] = $this->getTotalTime($fields['login_at'], $fields['logout_at']);
        $user = User::create($userRequesData);
        return response(['user' => $user, 'status' => 'success'], 201);

        //$user=User::whereDate('login_at', Carbon::now('Asia/Jerusalem')->today())->orderBy('id', 'DESC')->first();

        //if(isset($user) && count($user))
        //return response(['user' => $user, 'status' => 'Not Inserted'], 200);

        //if (isset($loginAt)){

        //$user = User::create([
        //'user_id' => auth()->id(),
        //'login_at' => $fields->login_at,
        //'logout_at' => $fields->logout_at,
        //'loc_target' => $fields->loc_target,
        //'total' => $fields->total,
        //'is_login' => isset($fields->is_login)? $fields->is_login:1
        //]);
        //return response(['user' => $user, 'status' => 'success'], 201);
        //}
        return response(['status' => 'Not Inserted'], 204);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $newUserProps = $request->all();
        $userPropsArr = array_intersect_key($newUserProps, $this->validationProps);
        $updateValidationProps = array_intersect_key($this->validationProps, $newUserProps);

        if ($userPropsArr && count($userPropsArr)) {
            $validator = Validator::make($userPropsArr, $updateValidationProps);
            if ($validator->fails()) {
                return response($validator, 422)->withErrors($validator)->withInput();
            }

            $validated = $validator->validated();
            if ($validated['logout_at'] && $validated['logout_at']) {
                $validated['total'] = $this->getTotalTime($validated['login_at'], $validated['logout_at']);
            }

            $user->update($validated);
            return response($user, 200);
        }
        return response(["message" => "No data was given."], 422);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $status = $user->delete();
        return response(['message' => "Succesfully Deleted.", 'status' => $status], 200);
    }

    public function getTotalTime($startAt, $endAt)
    {
        $startTime = Carbon::parse($startAt);
        $finishTime = Carbon::parse($endAt);
        return $startTime->diffInHours($finishTime) . ':' . $startTime->diff($finishTime)->format('%I:%S');
    }

    public function getBetweenDate($dateProps)
    {
        $newDt = [];
        if (isset($dateProps['start_at']) && isset($dateProps['end_at'])) {
            if (isset($dateProps['monthly'])) {
                $newDt['start_at'] = Carbon::parse($dateProps['start_at'])->startOfMonth();
                $newDt['end_at'] = Carbon::parse($dateProps['end_at'])->endOfMonth();
            } else {
                $newDt['start_at'] = Carbon::parse($dateProps['start_at']);
                $newDt['end_at'] = Carbon::parse($dateProps['end_at']);
            }
        } elseif (isset($dateProps['start_at'])) {
            $newDt['start_at'] = Carbon::parse($dateProps['start_at'])->startOfMonth();
            $newDt['end_at'] = Carbon::parse($dateProps['start_at'])->endOfMonth();
        } elseif (isset($dateProps['end_at'])) {
            $newDt['end_at'] = Carbon::parse($dateProps['end_at'])->endOfMonth();
            $newDt['start_at'] = Carbon::parse($dateProps['end_at'])->startOfMonth();
        } else {
            $newDt['start_at'] = Carbon::now()->startOfMonth();
            $newDt['end_at'] = Carbon::now()->endOfMonth();
        }
        return $newDt;
    }
}
