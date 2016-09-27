<?php

namespace SiMoms\Http\Controllers\Dashboard;

use Illuminate\Http\Request;
use SiMoms\Http\Requests;
use SiMoms\Http\Controllers\Controller;
use SiMoms\Models;
use SiMoms\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Contracts\Auth\Guard;
use SiMoms\Http\Requests\UserRequest;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
     public function __construct(Guard $auth)
     {
         $this->auth = $auth;
     }
    public function index()
    {
        //
        $this->data['title']         = "Daftar Pengguna Si Momsky";
        $this->data['content_title'] = "Daftar Pengguna";
        $this->data['users']         = User::All();
        return view('dashboard.users.index', $this->data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        $this->data['title']         = "Tambah Pengguna Si Momsky";
        $this->data['content_title'] = "Tambah Pengguna";
        return view('dashboard.users.create', $this->data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserRequest $request)
    {
        //
        $input = $request->all();
        $user  = new User($input);
        $user->status = 'Aktif';
        $user->save();
        return redirect()->to('dashboard/users');
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
        $this->data['data']          = User::find($id);
        $this->data['title']         = "Ubah Data Pengguna";
        $this->data['content_title'] = "Ubah Data Pengguna";
        return view('dashboard.users.edit', $this->data);
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
      /*  $rules = [
         'email' => 'required',
         'name' => 'required',
         'address' => 'required',
         'phone' => 'required',
        ];
        */
        $input    = $request->all();
        $user     = User::find($id);

        if($input['password'] == ""){
         $user->email = $input['email'];
         $user->name = $input['name'];
         $user->address = $input['address'];
         $user->phone = $input['phone'];
         $user->update();
        }
        else{
        $user->update($input);
        }
        return redirect()->to('dashboard/users');

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
        $users = User::find($id);
        $users->delete();
        return redirect()->back();
    }
}
