<?php

namespace SiMoms\Http\Requests;

use SiMoms\Http\Requests\Request;

class UserRequest extends Request
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
        return [
            //

            'username' => 'required',
            'password' => 'required',
            'email'    => 'required',
            'name'     => 'required',
            'address'  => 'required',
            'phone'    => 'required'

        ];
    }

    public function messages()
    {
        return [
      'username.required' => ':attribute harus diisi',
      'password.required' => ':attribute harus diisi',
      'email.required'    => ':attribute harus diisi',
      'name.required'     => ':attribute harus diisi',
      'address.required'  => ':attribute harus diisi',
      'phone.required'    => ':attribute harus diisi'

     ];
    }
}
