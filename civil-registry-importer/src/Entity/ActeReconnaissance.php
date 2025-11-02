<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ActeReconnaissance
 *
 * @ORM\Table(name="acte_reconnaissance", uniqueConstraints={@ORM\UniqueConstraint(name="num_acte", columns={"num_acte"})}, indexes={@ORM\Index(name="id_demande", columns={"id_demande"}), @ORM\Index(name="id_enfant", columns={"id_enfant"}), @ORM\Index(name="id_officier", columns={"id_officier"}), @ORM\Index(name="id_reconnaissant", columns={"id_reconnaissant"})})
 * @ORM\Entity
 */
class ActeReconnaissance
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_reconnaissance", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idReconnaissance;

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
     * @ORM\Column(name="id_enfant", type="integer", nullable=false)
     */
    private $idEnfant;

    /**
     * @var int
     *
     * @ORM\Column(name="id_reconnaissant", type="integer", nullable=false)
     */
    private $idReconnaissant;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_reconnaissance", type="date", nullable=false)
     */
    private $dateReconnaissance;

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
