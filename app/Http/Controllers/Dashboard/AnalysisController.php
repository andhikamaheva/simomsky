<?php

namespace SiMoms\Http\Controllers\Dashboard;

use Illuminate\Http\Request;
use SiMoms\Http\Requests;
use SiMoms\Http\Controllers\Controller;
use SiMoms\Models;
use SiMoms\Models\Group;
use SiMoms\Models\Moms;
use SiMoms\Models\Questions;
use Illuminate\Support\Facades\DB;
use SiMoms\Models\Quarterly;
use Illuminate\Contracts\Auth\Guard;

class AnalysisController extends Controller
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
        $this->data['title']         = "Kelola Analisis";
        $this->data['content_title'] = "Kelola Analisis";
        $this->data['questions'] = Questions::with('Groups')->get();

        return view('dashboard.analysis.index', $this->data);
    }

   public function result(){
        $this->data['title']         = "Hasil Analisis";
        $this->data['content_title'] = "Hasil Analisis";
        $this->data['moms'] = Moms::all();

        return view('dashboard.analysis.result', $this->data);
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
