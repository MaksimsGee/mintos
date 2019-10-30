<?php

namespace App\DataFixtures;

use App\Entity\Excludes;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    /** @var array */
    protected $words = [
        'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I',
        'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
        'this', 'but', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or',
        'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so',
        'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when'
    ];

    public function load(ObjectManager $manager)
    {
        $excludes = $manager
            ->getRepository(Excludes::class)
            ->findAll();

        if (!empty($excludes)) {
            return;
        }

        foreach ($this->words as $word) {
            $exclude = new Excludes();
            $exclude->setName($word);
            $exclude->setCreatedAt(new \DateTime());
            $exclude->setUpdatedAt(new \DateTime());

            $manager->persist($exclude);
        }

        $manager->flush();
    }
}
