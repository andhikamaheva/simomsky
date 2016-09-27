<?php

namespace SiMoms\Http\Controllers\Api;

use Illuminate\Http\Request;
use SiMoms\Http\Requests;
use SiMoms\Models;
use SiMoms\Models\Moms;
use SiMoms\Models\User;
use SiMoms\Models\Pregnants;
use SiMoms\Models\MomsQuarterly;
use Illuminate\Support\Facades\DB;
use SiMoms\Http\Controllers\Controller;
use Validator;
use Carbon\Carbon;

class ApiQuarterlyController extends Controller
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
        $quarterly = MomsQuarterly::where('pregnants_id', '=', $id)->get();
        if ($quarterly) {
            $available = false;
        } else {
            $available = true;
        }

        return response()->json(['success' => true, 'data' => $quarterly, 'available' => $available]);
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
    public function update(Request $request)
    {
        //
        $data             = $request->all();
        $quarterly        = MomsQuarterly::find($data['id']);
        $quarterly->score = $data['score'];
        $quarterly->risk  = $data['risk'];
        $quarterly->status = $data['status'];
        $quarterly->update();

        $mom = Moms::find($data['moms_id']);
        $mom->pregnant_status = $data['status'];
        $mom->update();
        return response()->json(['success' => true, 'messages' => 'Data berhasil disimpan']);
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
