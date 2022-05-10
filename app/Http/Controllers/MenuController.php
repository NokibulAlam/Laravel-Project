<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\BaseController;

class MenuController extends BaseController
{
    public function index()
    {
        $this->setPageData('Menu', 'Menu', 'fas fa-th-list');
        return view('menu.index');
    }

    public function get_datatable_data(Request $request)
    {
        if($request->ajax()){
            $output = '';
        }
        else{
            $output = ['status' => 'error', 'message' => 'Unauthorized Access Blocked'];
        }
        return response()->json($output);
    }
}
