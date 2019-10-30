<?php

namespace App\Http\Controllers;

use App\Excludes;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use App\Http\Requests\App as AppRequest;

class AppController extends BaseController
{
    use DispatchesJobs, ValidatesRequests;

    /** @var string */
    protected $feedUrl = 'https://www.theregister.co.uk/software/headlines.atom';

    /**
     * @param AppRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function excludes(AppRequest $request)
    {
        $excludes = Excludes::all();

        return response()->json(compact('excludes'), 200);
    }

    /**
     * @param AppRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function feed(AppRequest $request)
    {
        $feedPlain = file_get_contents($this->feedUrl);
        $feedParsed = simplexml_load_string($feedPlain);

        return response()->json(['feed' => $feedParsed, 'plain' => $feedPlain]);
    }

    /**
     * @param AppRequest $request
     * @param null $route
     * @return \Illuminate\Http\JsonResponse
     */
    public function notFound(AppRequest $request, $route = null)
    {
        $data = sprintf('Endpoint \'%s\' does not exist', $request->getRequestUri());

        return response()->json(compact('data'),200);
    }
}
