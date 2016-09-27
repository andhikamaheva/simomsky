<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('index');
});
Route::get('login', function () {
    return view('login');
});

//Route::get('test'.)

Route::get('test', 'QuestionController@index');


Route::post('/login', 'LoginController@auth');
Route::get('logout', 'LoginController@logout');
Route::resource('dukungan', 'DukunganController');

Route::group(['prefix' => 'dashboard'], function () {
 Route::resource('/', 'Dashboard\DashboardController');
 Route::resource('users', 'Dashboard\UsersController');
 Route::get('users/{id}/delete', 'Dashboard\UsersController@destroy');
 Route::post('users/{id}', 'Dashboard\UsersController@update');
 Route::resource('analysis', 'Dashboard\AnalysisController');
 Route::get('result', 'Dashboard\AnalysisController@result');
 Route::resource('feedback', 'FeedBackController');
});

Route::group(['prefix' => 'api', 'middleware' => 'cors'], function () {
 Route::resource('/', 'Api\ApiController');
 Route::resource('/user', 'Api\UserController');
 Route::post('login', 'Api\ApiLoginController@auth');
 Route::post('register', 'Api\ApiUserController@create');
 Route::post('mom', 'Api\ApiMomsController@create');
 Route::post('logout', 'Api\ApiLoginController@logout');
 Route::post('search', 'Api\ApiMomsController@search');

 Route::get('moms/{id}', 'Api\ApiMomsController@index');
 Route::get('mom/{id}', 'Api\ApiMomsController@show');

Route::post('pregnant', 'Api\ApiPregnantsController@addPregnant');
Route::post('feedback', 'Api\ApiFeedBackController@store');
Route::get('pregnant/{id}', 'Api\ApiPregnantsController@show');
Route::get('quarterly/{id}', 'Api\ApiQuarterlyController@show');
Route::post('quarterly', 'Api\ApiQuarterlyController@update');


});
