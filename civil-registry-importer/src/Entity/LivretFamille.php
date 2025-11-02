<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * LivretFamille
 *
 * @ORM\Table(name="livret_famille", uniqueConstraints={@ORM\UniqueConstraint(name="num_livret", columns={"num_livret"})}, indexes={@ORM\Index(name="id_mariage", columns={"id_mariage"})})
 * @ORM\Entity
 */
class LivretFamille
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_livret", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idLivret;

    /**
     * @var string
     *
     * @ORM\Column(name="num_livret", type="string", length=50, nullable=false)
     */
    private $numLivret;

    /**
     * @var int|null
     *
     * @ORM\Column(name="id_mariage", type="integer", nullable=true)
     */
    private $idMariage;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_creation", type="date", nullable=false)
     */
    private $dateCreation;

    /**
     * @var string|null
     *
     * @ORM\Column(name="commentaire", type="string", length=150, nullable=true)
     */
    private $commentaire;


}
