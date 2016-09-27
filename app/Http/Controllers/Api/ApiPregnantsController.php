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

class ApiPregnantsController extends Controller
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

    public function addPregnant(Request $request)
    {
        $rules = [
      'last_period' => 'required|date',
      'estimate'    => 'required|date',
      'pregnants'   => 'required|numeric|max:5',
      'moms_id'     => 'required',
     ];

        $messages = [
      'last_period.required' => 'Periode Menstruasi Harus Diisi',
      'last_period.date'     => 'Periode Menstruasi Harus Berupa Tanggal',
      'estimate.required'    => 'Estimasi Kelahiran Harus Diisi',
      'estimate.date'        => 'Estimasi Kelahiran Harus Berupa Tanggal',
      'pregnants.required'   => 'Jumlah Kehamilan Harus Diisi',
      'pregnants.max'        => 'Jumlah Kehamilan Harus Kurang dari 5',
      'pregnants.numeric'    => 'Jumlah Kehamilan Harus Berupa Angka',
      'moms_id.required'     => 'ID Moms Harus Diisi',
     ];

        $data      = $request->all();
        $validator = Validator::make($data, $rules, $messages);
        if ($validator->fails()) {
            $errors = $validator->errors()->all();
            return response()->json(['success' => false, 'title' => 'Terjadi Kesalahan', 'messages' => $errors], 501);
        } else {

         //Update data moms
            $moms            = Moms::find($data['moms_id']);
            $moms->pregnants = $data['pregnants'];
            $moms->status    = 'Hamil';
            $moms->progress  = 25;
            $moms->update();

         //Insert data Pregnants
            $pregnants                 = new Pregnants();
            $pregnants->last_period    = $data['last_period'];
            $pregnants->estimate       = $data['estimate'];
            $pregnants->pregnants      = $data['pregnants'];
            $pregnants->status         = 'Masa Hamil';
            $pregnants->moms_id        = $data['moms_id'];
            $pregnants->save();


         //Generate data Quarterly

         /*for($i = 0; $i<4; $i++){
           $quarterly = new MomsQuarterly();
           $quarterly->quarterly_id = $i+1;
           $quarterly->pregnants_id = $pregnants->id;
           $quarterly->save();
         }*/
            $quarterly               = new MomsQuarterly();
            $quarterly->quarterly_id = 1;
            $quarterly->pregnants_id = $pregnants->id;
            $quarterly->date         = Carbon::now()->toDateTimeString();
            $quarterly->status       = "Normal";
            $quarterly->score        = 0;
            $pregnants->last_check   = $quarterly->date;
            $pregnants->update();
            $quarterly->save();

            return response()->json(['success' => true, 'title' => 'Berhasil Disimpan', 'messages' => 'Data Kehamilan Berhasil Disimpan']);
        }
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
        $pregnants = Pregnants::where('moms_id', '=', $id)->get();
        //$add = true;

        if ($pregnants->count()) {
            foreach ($pregnants as $pregnant) {
                if ($pregnant->status != 'Sukses') {
                    $add = false;
                } else {
                    $add = true;
                }
            }
        } else {
            $add       = true;
            $pregnants = false;
        }

        return response()->json(['success' => true, 'data' => $pregnants, 'add' => $add]);
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
