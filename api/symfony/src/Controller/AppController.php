<?php

namespace App\Controller;

use App\Entity\Excludes;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class AppController extends AbstractController
{
    /** @var string */
    protected $feed = 'https://www.theregister.co.uk/software/headlines.atom';

    /**
     * @Route("/excludes", name="excludes",  methods={"GET"})
     * @param Request $request
     * @return JsonResponse
     */
    public function excludes(Request $request)
    {
        $repository = $this->getDoctrine()->getRepository(Excludes::class);
        $excludes = $repository->findAll();

        return new JsonResponse(["excludes" => $excludes], 200);
    }

    /**
     * @Route("/feed", name="feed",  methods={"GET"})
     * @param Request $request
     * @return JsonResponse
     */
    public function feed(Request $request)
    {
        $feed = simplexml_load_string(file_get_contents($this->feed));

        return new JsonResponse($feed, 200);
    }
}
