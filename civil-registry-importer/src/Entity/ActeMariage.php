<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ActeMariage
 *
 * @ORM\Table(name="acte_mariage", uniqueConstraints={@ORM\UniqueConstraint(name="num_acte", columns={"num_acte"})}, indexes={@ORM\Index(name="id_demande", columns={"id_demande"}), @ORM\Index(name="id_epoux1", columns={"id_epoux1"}), @ORM\Index(name="id_epoux2", columns={"id_epoux2"}), @ORM\Index(name="id_officier", columns={"id_officier"}), @ORM\Index(name="id_temoin1", columns={"id_temoin1"}), @ORM\Index(name="id_temoin2", columns={"id_temoin2"})})
 * @ORM\Entity
 */
class ActeMariage
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_mariage", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idMariage;

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
     * @ORM\Column(name="id_epoux1", type="integer", nullable=false)
     */
    private $idEpoux1;

    /**
     * @var int
     *
     * @ORM\Column(name="id_epoux2", type="integer", nullable=false)
     */
    private $idEpoux2;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_mariage", type="date", nullable=false)
     */
    private $dateMariage;

    /**
     * @var string
     *
     * @ORM\Column(name="lieu_mariage", type="string", length=150, nullable=false)
     */
    private $lieuMariage;

    /**
     * @var string|null
     *
     * @ORM\Column(name="regime_matrimonial", type="string", length=50, nullable=true, options={"default"="communauté de biens"})
     */
    private $regimeMatrimonial = 'communauté de biens';

    /**
     * @var string|null
     *
     * @ORM\Column(name="reference_ordonnance", type="string", length=100, nullable=true)
     */
    private $referenceOrdonnance;

    /**
     * @var string|null
     *
     * @ORM\Column(name="nationalite_epoux1", type="string", length=50, nullable=true, options={"default"="Malgache"})
     */
    private $nationaliteEpoux1 = 'Malgache';

    /**
     * @var string|null
     *
     * @ORM\Column(name="nationalite_epoux2", type="string", length=50, nullable=true, options={"default"="Malgache"})
     */
    private $nationaliteEpoux2 = 'Malgache';

    /**
     * @var int
     *
     * @ORM\Column(name="id_temoin1", type="integer", nullable=false)
     */
    private $idTemoin1;

    /**
     * @var int
     *
     * @ORM\Column(name="id_temoin2", type="integer", nullable=false)
     */
    private $idTemoin2;

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
     * @var string|null
     *
     * @ORM\Column(name="commentaire", type="string", length=255, nullable=true)
     */
    private $commentaire;


}
