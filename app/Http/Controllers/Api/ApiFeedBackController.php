<?php

namespace SiMoms\Http\Controllers\Api;

use Illuminate\Http\Request;
use SiMoms\Models\Feedback;
use SiMoms\Http\Requests;
use SiMoms\Http\Controllers\Controller;
use Validator;

class ApiFeedBackController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
        $rules = [
         'message'  => 'required',
         'username' => 'required',
         'email'    => 'required',
        ];

        $messages = [
         'message.required'  => 'Pesan harus dimasukkan',
         'username.required' => 'Pesan harus dimasukkan',
         'email.required'    => 'Pesan harus dimasukkan',
        ];


        $data      = $request->all();
        $validator = Validator::make($data, $rules, $messages);
        if ($validator->fails()) {
            $errors = $validator->errors()->all();
            return response()->json(['success' => false, 'messages' => $errors],501);
        } else {
            $feedback  = new Feedback($data);
            $feedback->save();
            return response()->json(['success' => true, 'messages' => 'Pesan Berhasil disimpan!']);
        }
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
