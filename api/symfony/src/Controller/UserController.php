<?php

namespace App\Controller;

use App\Entity\Excludes;
use FOS\UserBundle\Model\UserManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Users;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validation;
use Symfony\Component\Validator\Constraints as Assert;

class UserController extends AbstractController
{
    /**
     * @Route("/register", name="api_register",  methods={"POST"})
     * @param Request $request
     * @param UserManagerInterface $userManager
     * @return JsonResponse
     */
    public function register(Request $request, UserManagerInterface $userManager)
    {
        $errors = [];
        $data = json_decode($request->getContent(), true);
        $validator = Validation::createValidator();

        $user = $this->getDoctrine()->getRepository(Users::class)
            ->findOneBy(['email' => $data['email']]);

        if (!empty($user)) {
            $errors['email'] = 'Email already exists';
        }

        $constraint = new Assert\Collection([
            'password' => [
                new Assert\Length(['min' => 6]), new Assert\Required(),
            ],
            'password_confirmation' => [
                new Assert\Length(['min' => 6]), new Assert\IdenticalTo($data['password']),
            ],
            'email' => [
                new Assert\Email(), new Assert\Required(),
            ],
        ]);
        $violations = $validator->validate($data, $constraint);

        if ($violations->count() > 0) {
            foreach ($violations as $violation) {
                $errors[str_replace(['[', ']'], '', $violation->getPropertyPath())][] = $violation->getMessage();
            }
        }

        if (!empty($errors)) {
            return new JsonResponse(['message' => 'The given data was invalid', 'errors' => $errors], 500);
        }

        $user = new Users();
        $user
            ->setName('fake symfony')
            ->setPlainPassword($data['password'])
            ->setEmail($data['email'])
            ->setEnabled(true)
            ->setUsername($data['email'])
        ;
        try {
            $userManager->updateUser($user);
        } catch (\Exception $e) {
            return new JsonResponse(['message' => $e->getMessage()], 500);
        }
        return new JsonResponse(['message' => 'user registered'], 200);
    }
}
