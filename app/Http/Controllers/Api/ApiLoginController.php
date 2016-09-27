<?php

namespace SiMoms\Http\Controllers\Api;

use SiMoms\Http\Controllers\Controller;
use SiMoms\Http\Requests\LoginRequest;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\MessageBag;
use SiMoms\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use SiMoms\Http\Requests;
use Validator;

class ApiLoginController extends Controller
{
    public function __construct(Guard $auth)
    {
        $this->auth = $auth;
    }



    public function auth(Request $request)
    {
        $rules = [
         'username' => 'required',
         'password' => 'required',
        ];

        $messages = [
         'username.required' => 'Username wajib diisi',
         'password.required' => 'Password wajib diisi',
        ];

        $data          = $request->all();
        $validator     = Validator::make($data, $rules, $messages);
        $username      = $request->get('username');
        $password      = $request->get('password');

        if ($validator->fails()) {
            $errors = $validator->errors()->all();
            return response()->json(['success' => false, 'messages' => $errors], 501);
        } else {
            if ($this->auth->attempt(['username' => $username, 'password' => $password])) {
                $user               = $this->auth->user();
                $user->latest_login = Carbon::now()->toDateTimeString();
                $user->update();
                return response()->json(['success' => true, 'code' =>'200', 'data' => $user], 200);
            } else {
                return response()->json(['success' => false, 'code' =>'401', 'messages' => 'Username atau Password Anda Salah!'],200);
            }
        }
    }
    public function logout()
    {
        $this->auth->logout();
        return response()->json(['success' => true, 'messages' => 'Anda berhasil logout'], 200);
    }
}
