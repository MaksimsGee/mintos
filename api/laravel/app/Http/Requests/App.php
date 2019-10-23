<?php

namespace App\Http\Requests;

use App\Http\Classes\BaseFormRequest;

class App extends BaseFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function excludesRules()
    {
        return [];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function feedRules()
    {
        return [];
    }
}
