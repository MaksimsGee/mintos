<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', 'UserController@authenticate');
Route::post('register', 'UserController@register');

Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('excludes', 'AppController@excludes');
    Route::get('feed', 'AppController@feed');
});

// fallback if end-point not found
Route::any('/', 'AppController@notFound'); // usually this section respond something as well
Route::any('{route}', 'AppController@notFound')->where('route', '(.*)?');
