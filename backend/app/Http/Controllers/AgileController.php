<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Models\Agile;

class AgileController extends Controller
{
    public function getAgileList($type)
    {   
        $values_list = Agile::where('type', "=", $type)
                            ->where('delete_flg', "=", "0")
                            ->orderBy('created_at','desc')
                            ->get();

        return response()->json(
            $values_list,
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    public function show($agile_id)
    {
        $agile_info = Agile::findOrFail($agile_id);
        
        return response()->json(
            $agile_info,
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    public function update($agile_id, Request $request)
    {
        $agile = Agile::findOrFail($agile_id);
        $agile->fill([
            'title'             => $request->title,
            'description'       => $request->description
        ]);
        $agile->save();

        $message = "Information updated successfully.";
        $status = 200;

        return response()->json(
            [
                'status' => 'success',
                'message' => $message
            ],
            $status,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    public function store(Request $request){

        $agile_info = new Agile();
        // creating the agile information
        $agile_info->fill([
            'title'         => $request->title,
            'description'   => $request->description,
            'type'          => $request->type,
            'delete_flg'    => 0
        ]);
        $agile_info->save();

        $message = "Information saved successfully.";
        $status = 200;

        return response()->json(
            [
                'status' => 'success',
                'message' => $message
            ],
            $status,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    public function destroy($agile_id)
    {
        $agile = Agile::findOrFail($agile_id);
        $agile->delete_flg = 1;
        $agile->save();

        $message = "Record was deleted successfully.";
        $status = 200;

        return response()->json(
            [
                'status' => 'saved',
                'message' => $message
            ],
            $status,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }
}
