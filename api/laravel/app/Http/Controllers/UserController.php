<?php

namespace App\Http\Controllers;

use DB;
use JWTAuth;
use App\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Routing\Controller;
use App\Http\Requests\User as UserRequest;

class UserController extends Controller
{
    /**
     * @param UserRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function authenticate(UserRequest $request)
    {
        $credentials = $request->only('email', 'password');

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['message' => 'invalid_credentials'], 400);
            }
        } catch (JWTException $e) {
            return response()->json(['message' => 'could_not_create_token'], 500);
        }

        return response()->json(['token' => $token, 'message' => 'successfully logged in'], 200);
    }

    /**
     * @param UserRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(UserRequest $request)
    {
        DB::beginTransaction(); // in case if something gone wrong due to save use transaction

        try {
            $user = User::create([
                'name' => 'fake laravel',
                'email' => $request->get('email'),
                'password' => Hash::make($request->get('password')),
            ]);

            $token = JWTAuth::fromUser($user);

            DB::commit();

            return response()->json(['user' => $user, 'token' => $token, 'message' => 'user registered'], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
