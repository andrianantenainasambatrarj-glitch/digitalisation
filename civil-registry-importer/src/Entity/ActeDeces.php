<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ActeDeces
 *
 * @ORM\Table(name="acte_deces", uniqueConstraints={@ORM\UniqueConstraint(name="num_acte", columns={"num_acte"})}, indexes={@ORM\Index(name="id_conjoint", columns={"id_conjoint"}), @ORM\Index(name="id_declarant", columns={"id_declarant"}), @ORM\Index(name="id_defunt", columns={"id_defunt"}), @ORM\Index(name="id_demande", columns={"id_demande"}), @ORM\Index(name="id_mere", columns={"id_mere"}), @ORM\Index(name="id_officier", columns={"id_officier"}), @ORM\Index(name="id_pere", columns={"id_pere"})})
 * @ORM\Entity
 */
class ActeDeces
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_deces", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idDeces;

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
     * @ORM\Column(name="id_defunt", type="integer", nullable=false)
     */
    private $idDefunt;

    /**
     * @var int|null
     *
     * @ORM\Column(name="id_conjoint", type="integer", nullable=true)
     */
    private $idConjoint;

    /**
     * @var int|null
     *
     * @ORM\Column(name="id_pere", type="integer", nullable=true)
     */
    private $idPere;

    /**
     * @var int|null
     *
     * @ORM\Column(name="id_mere", type="integer", nullable=true)
     */
    private $idMere;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_deces", type="date", nullable=false)
     */
    private $dateDeces;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="heure_deces", type="time", nullable=true)
     */
    private $heureDeces;

    /**
     * @var string
     *
     * @ORM\Column(name="lieu_deces", type="string", length=150, nullable=false)
     */
    private $lieuDeces;

    /**
     * @var int|null
     *
     * @ORM\Column(name="id_declarant", type="integer", nullable=true)
     */
    private $idDeclarant;

    /**
     * @var int|null
     *
     * @ORM\Column(name="id_officier", type="integer", nullable=true)
     */
    private $idOfficier;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_acte", type="date", nullable=false)
     */
    private $dateActe;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="date_delivrance", type="date", nullable=true)
     */
    private $dateDelivrance;

    /**
     * @var string|null
     *
     * @ORM\Column(name="mention_marginale", type="string", length=255, nullable=true)
     */
    private $mentionMarginale;


}
