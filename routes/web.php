<?php

use Illuminate\Routing\RouteGroup;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Auth::routes(['register'=>false]);



Route::group(['middleware' => ['auth']], function(){
    Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

    //Menu Routes
    Route::get('menu',[App\Http\Controllers\MenuController::class, 'index'])->name('menu');
    Route::group(['prefix' => 'menu', 'as' => 'menu.'], function(){
        Route::post('datatable-data',[App\Http\Controllers\MenuController::class, 'get_datatable_data'])->name('datatable.data');
        Route::post('store-or-update',[App\Http\Controllers\MenuController::class, 'store_or_update_data'])->name('store.or.update');
        Route::post('edit',[App\Http\Controllers\MenuController::class, 'edit'])->name('edit');
        Route::post('delete',[App\Http\Controllers\MenuController::class, 'delete'])->name('delete');
        Route::post('bulk-delete',[App\Http\Controllers\MenuController::class, 'bulk_delete'])->name('bulk.delete');
    });
});