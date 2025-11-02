<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ActeCelibat
 *
 * @ORM\Table(name="acte_celibat", indexes={@ORM\Index(name="id_demande", columns={"id_demande"}), @ORM\Index(name="id_officier", columns={"id_officier"}), @ORM\Index(name="id_personne", columns={"id_personne"})})
 * @ORM\Entity
 */
class ActeCelibat
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_celibat", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idCelibat;

    /**
     * @var int
     *
     * @ORM\Column(name="id_demande", type="integer", nullable=false)
     */
    private $idDemande;

    /**
     * @var int
     *
     * @ORM\Column(name="id_personne", type="integer", nullable=false)
     */
    private $idPersonne;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_etablissement", type="date", nullable=false)
     */
    private $dateEtablissement;

    /**
     * @var string|null
     *
     * @ORM\Column(name="mention_officielle", type="string", length=100, nullable=true)
     */
    private $mentionOfficielle;

    /**
     * @var int|null
     *
     * @ORM\Column(name="id_officier", type="integer", nullable=true)
     */
    private $idOfficier;


}
