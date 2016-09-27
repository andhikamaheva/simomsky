<?php

namespace SiMoms\Http\Controllers\Dashboard;

use Illuminate\Http\Request;
use SiMoms\Http\Requests;
use SiMoms\Http\Controllers\Controller;
use Illuminate\Contracts\Auth\Guard;
use SiMoms\Models;
use Illuminate\Support\Facades\DB;
use SiMoms\Models\Moms;
use SiMoms\Models\Feedback;
use SiMoms\Models\Pregnants;
use SiMoms\Models\MomsQuarterly;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
     public function __construct(Guard $auth)
     {
         $this->auth                   = $auth;
         $this->data['latestlogin']    = Models\User::orderBy('updated_at', 'desc')->limit(7)->get();
         $this->data['userscount']     = Models\User::count();
         $this->data['momscount']      = Moms::count();
         $this->data['feedbackcount']  = Feedback::count();
         $this->data['pregnantscount'] = Pregnants::count();
         $this->data['title']          = "Dashboard Si Momsky";
         $this->data['content_title']  = "Dashboard";
     }
    public function index()
    {
        //

        return view('dashboard.index', $this->data);
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
