<?php

namespace SiMoms\Http\Controllers;

use SiMoms\Http\Controllers\Controller;
use SiMoms\Http\Requests\LoginRequest;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\MessageBag;
use SiMoms\Models\User;
use Carbon\Carbon;

class LoginController extends Controller
{
    public function __construct(Guard $auth)
    {
        $this->auth = $auth;
    }



    public function auth(LoginRequest $request)
    {
        $username      = $request->get('username');
        $password      = $request->get('password');


        if ($this->auth->attempt(['username' => $username, 'password' => $password])) {

            $user = $this->auth->user();
            $user->latest_login = Carbon::now()->toDateTimeString();
            $user->update();
            return redirect('dashboard');
        } else {
         return redirect()->back();
            //return redirect()->back();
            //$messages = $validator->errors();
            //echo $messages->first('username');
        }
    }
    public function logout()
    {
        $this->auth->logout();
        return redirect()->to('/');
    }
}
