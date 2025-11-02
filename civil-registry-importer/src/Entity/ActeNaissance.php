<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ActeNaissance
 *
 * @ORM\Table(name="acte_naissance", uniqueConstraints={@ORM\UniqueConstraint(name="num_acte", columns={"num_acte"})}, indexes={@ORM\Index(name="id_declarant", columns={"id_declarant"}), @ORM\Index(name="id_demande", columns={"id_demande"}), @ORM\Index(name="id_mere", columns={"id_mere"}), @ORM\Index(name="id_officier", columns={"id_officier"}), @ORM\Index(name="id_pere", columns={"id_pere"})})
 * @ORM\Entity
 */
class ActeNaissance
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_naissance", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idNaissance;

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
     * @ORM\Column(name="nom_enfant", type="string", length=100, nullable=false)
     */
    private $nomEnfant;

    /**
     * @var string
     *
     * @ORM\Column(name="prenom_enfant", type="string", length=100, nullable=false)
     */
    private $prenomEnfant;

    /**
     * @var string
     *
     * @ORM\Column(name="sexe", type="string", length=1, nullable=false, options={"fixed"=true})
     */
    private $sexe;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_naissance", type="date", nullable=false)
     */
    private $dateNaissance;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="heure_naissance", type="time", nullable=true)
     */
    private $heureNaissance;

    /**
     * @var string
     *
     * @ORM\Column(name="lieu_naissance", type="string", length=150, nullable=false)
     */
    private $lieuNaissance;

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
