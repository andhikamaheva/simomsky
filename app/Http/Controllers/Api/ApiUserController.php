<?php

namespace SiMoms\Http\Controllers\Api;

use Illuminate\Http\Request;
use SiMoms\Http\Requests;
use SiMoms\Http\Controllers\Controller;
use SiMoms\Models;
use SiMoms\Models\User;
use Validator;

class ApiUserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $user = User::all();
        return response()->json(['success' => true, 'data' => $user]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        //
        $rules =[
         'username' => 'required|unique:users,username',
         'password' => 'required',
         'email'    => 'required',
         'name'     => 'required',
         'address'  => 'required',
         'work'     => 'required',
         'phone'    => 'required|numeric',
        ];

        $messages = [
         'username.required' => ':attribute wajib diisi',
         'username.unique'   => ':attribute telah terdaftar',
         'password.required' => ':attribute wajib diisi',
         'email.required'    => ':attribute wajib diisi',
         'name.required'     => ':attribute wajib diisi',
         'address.required'  => ':attribute wajib diisi',
         'phone.required'    => ':attribute wajib diisi',
         'work.required'     => ':attribute wajib diisi',
        ];
        $data = $request->all();
        $validator = Validator::make($data, $rules, $messages);
        if ($validator->fails()){
         $errors = $validator->errors()->all();
         return response()->json(['success' => false, 'messages' => $errors], 401);
        }
        else{
         $user = new User($data);
         $user->work = $data['work'];
         $user->status = 'Aktif';
         if($user->save()){
          return response()->json(['success' => false, 'messages' => 'Registrasi berhasil, silahkan login'], 200);
         }
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
