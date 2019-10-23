<?php

namespace App\Repository;

use App\Entity\Excludes;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Excludes|null find($id, $lockMode = null, $lockVersion = null)
 * @method Excludes|null findOneBy(array $criteria, array $orderBy = null)
 * @method Excludes[]    findAll()
 * @method Excludes[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ExcludesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Excludes::class);
    }

    // /**
    //  * @return Excludes[] Returns an array of Excludes objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('e.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Excludes
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
