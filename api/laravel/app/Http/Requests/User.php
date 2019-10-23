<?php

namespace App\Http\Requests;

use App\Http\Classes\BaseFormRequest;

class User extends BaseFormRequest
{
    /**
     * @return array
     */
    public function authenticateRules()
    {
        return [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ];
    }

    /**
     * @return array
     */
    public function registerRules()
    {
        return [
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'password_confirmation' => 'required|string|min:6'
        ];
    }

    /**
     * @return array
     */
    public function logoutRules()
    {
        return [];
    }
}
