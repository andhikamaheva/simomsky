<?php

namespace SiMoms\Http\Controllers\Api;

use Illuminate\Http\Request;
use SiMoms\Http\Requests;
use SiMoms\Models;
use SiMoms\Models\Moms;
use SiMoms\Models\User;
use Illuminate\Support\Facades\DB;
use SiMoms\Http\Controllers\Controller;
use Validator;

class ApiMomsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        //
        $moms = Moms::where('users_id', $id)->get();

        return response()->json(['success' => true, 'data' => $moms], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        //
        
        $rules = [
         'name'         => 'required',
         'birthdate'    => 'required|date',
         'age'          => 'required|numeric',
         'husband_name' => 'required',
         'education'    => 'required',
         'work'         => 'required',
         'pregnants'    => 'required|numeric',
         'users_id'     => 'required',
         'address'      => 'required',
         'city'         => 'required',
        ];

        $messages = [
         'name.required'         => 'Nama wajib diisi',
         'birthdate.required'    => 'Tanggal Lahir wajib diisi',
         'birthdate.date'        => 'Tanggal Lahir tidak valid',
         'age.required'          => 'Umur wajib diisi',
         'age.numeric'           => 'Umur harus berupa angka',
         'husband_name.required' => 'Nama Suami wajib diisi',
         'education.required'    => 'Pendidikan wajib diisi',
         'work.required'         => 'Pekerjaan wajib diisi',
         'pregnants.required'    => 'Kehamilan wajib diisi',
         'pregnants.required'    => 'Kehamilan harus berupa angka',
         'users_id.required'     => ':attribute wajib diisi',
         'address.required'      => 'Alamat wajib diisi',
         'city.required'         => 'Kota wajib diisi',
        ];
        $data      = $request->all();
       // dd($data['address']);
        $validator = Validator::make($data, $rules, $messages);
        if ($validator->fails()) {
            $errors = $validator->errors()->all();
            return response()->json(['success' => false, 'title' => 'Terjadi Kesalahan', 'messages' => $errors ], 401);
        } else {
            $mom                  = new Moms($data);
            $mom->status          = 'Normal';
            $mom->pregnant_status = 'Normal';
            $mom->progress        = 0;
            $mom->address         = $data['address'];
            $mom->city            = $data['city'];
            if ($mom->save()) {
                $getID = Moms::where('name', '=', $data['name'])->first();
                return response()->json(['success' => true, 'title' => 'Berhasil Disimpan', 'messages' => 'Data Moms berhasil disimpan', 'data' => $getID->id], 200);
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
        $moms = Moms::find($id);
        return response()->json(['success' => true, 'data' => $moms], 200);
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

    public function search(Request $request)
    {
        //
        $rules = [
         'keyword' => 'required',
        ];
        $messages = [
         'keyword.required' => 'Nilai harus diisi',
        ];
        $data      = $request->all();
        $validator = Validator::make($data, $rules, $messages);
        if ($validator->fails()) {
            $errors = $validator->errors()->all();
            return response()->json(['success' => false, 'messages' => $errors]);
        } else {
            $mom = Moms::where('name', 'like', '%'.$data['keyword'].'%')->get();
            if ($mom == "") {
                return response()->json(['success' => true, 'messages'=> 'Moms tidak ditemukan']);
            } else {
                return response()->json(['success' => true, 'data'=> $mom]);
            }
        }
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
