<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ActeAdoption
 *
 * @ORM\Table(name="acte_adoption", uniqueConstraints={@ORM\UniqueConstraint(name="num_acte", columns={"num_acte"})}, indexes={@ORM\Index(name="id_adoptant1", columns={"id_adoptant1"}), @ORM\Index(name="id_adoptant2", columns={"id_adoptant2"}), @ORM\Index(name="id_adopte", columns={"id_adopte"}), @ORM\Index(name="id_demande", columns={"id_demande"}), @ORM\Index(name="id_officier", columns={"id_officier"})})
 * @ORM\Entity
 */
class ActeAdoption
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_adoption", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idAdoption;

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
     * @var string
     *
     * @ORM\Column(name="type_adoption", type="string", length=0, nullable=false)
     */
    private $typeAdoption;

    /**
     * @var int
     *
     * @ORM\Column(name="id_adoptant1", type="integer", nullable=false)
     */
    private $idAdoptant1;

    /**
     * @var int|null
     *
     * @ORM\Column(name="id_adoptant2", type="integer", nullable=true)
     */
    private $idAdoptant2;

    /**
     * @var int
     *
     * @ORM\Column(name="id_adopte", type="integer", nullable=false)
     */
    private $idAdopte;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_adoption", type="date", nullable=false)
     */
    private $dateAdoption;

    /**
     * @var string|null
     *
     * @ORM\Column(name="ref_jugement", type="string", length=150, nullable=true)
     */
    private $refJugement;

    /**
     * @var int|null
     *
     * @ORM\Column(name="id_officier", type="integer", nullable=true)
     */
    private $idOfficier;

    /**
     * @var string|null
     *
     * @ORM\Column(name="commentaire", type="string", length=200, nullable=true)
     */
    private $commentaire;


}
