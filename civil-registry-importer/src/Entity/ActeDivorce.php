<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ActeDivorce
 *
 * @ORM\Table(name="acte_divorce", uniqueConstraints={@ORM\UniqueConstraint(name="num_acte", columns={"num_acte"})}, indexes={@ORM\Index(name="id_demande", columns={"id_demande"}), @ORM\Index(name="id_mariage", columns={"id_mariage"}), @ORM\Index(name="id_officier", columns={"id_officier"})})
 * @ORM\Entity
 */
class ActeDivorce
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_divorce", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idDivorce;

    /**
     * @var string
     *
     * @ORM\Column(name="num_acte", type="string", length=50, nullable=false)
     */
    private $numActe;

    /**
     * @var int
     *
     * @ORM\Column(name="id_demande", type="integer", nullable=false)
     */
    private $idDemande;

    /**
     * @var int
     *
     * @ORM\Column(name="id_mariage", type="integer", nullable=false)
     */
    private $idMariage;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_divorce", type="date", nullable=false)
     */
    private $dateDivorce;

    /**
     * @var string|null
     *
     * @ORM\Column(name="id_jugement", type="string", length=100, nullable=true)
     */
    private $idJugement;

    /**
     * @var int|null
     *
     * @ORM\Column(name="id_officier", type="integer", nullable=true)
     */
    private $idOfficier;

    /**
     * @var string|null
     *
     * @ORM\Column(name="commentaire", type="string", length=150, nullable=true)
     */
    private $commentaire;


}
