<?php

namespace SiMoms\Http\Controllers;

use Illuminate\Http\Request;
use SiMoms\Models\Feedback;
use SiMoms\Http\Requests;
use SiMoms\Http\Controllers\Controller;
use SiMoms\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Contracts\Auth\Guard;

class FeedBackController extends Controller
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
        $this->data['title']         = "Feedback Pengguna Si Momsky";
        $this->data['content_title'] = "Feedback Pengguna";
        $this->data['feedbacks']     = Feedback::all();
        $this->data['users']         = User::All();
        return view('dashboard.feedback', $this->data);
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
