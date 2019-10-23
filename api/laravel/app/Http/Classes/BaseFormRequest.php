<?php

namespace App\Http\Classes;

use Illuminate\Foundation\Http\FormRequest;

class BaseFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $method = lcfirst($this->findMethodName()) . 'Rules';
        if (method_exists($this, $method)) {
            return $this->$method();
        }

        return [];
    }

    /**
     * Find the method name for the current route
     *
     * @return string
     */
    protected function findMethodName()
    {
        list($class, $method) = explode('@', $this->route()->getActionName());
        return $method;
    }
}
