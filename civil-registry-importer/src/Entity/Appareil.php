<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Appareil
 *
 * @ORM\Table(name="appareil")
 * @ORM\Entity
 */
class Appareil
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_appareil", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idAppareil;

    /**
     * @var string|null
     *
     * @ORM\Column(name="nom_appareil", type="string", length=100, nullable=true)
     */
    private $nomAppareil;

    /**
     * @var string|null
     *
     * @ORM\Column(name="type_appareil", type="string", length=50, nullable=true)
     */
    private $typeAppareil;

    /**
     * @var string|null
     *
     * @ORM\Column(name="numero_serie", type="string", length=100, nullable=true)
     */
    private $numeroSerie;

    /**
     * @var string|null
     *
     * @ORM\Column(name="imei", type="string", length=50, nullable=true)
     */
    private $imei;

    /**
     * @var string|null
     *
     * @ORM\Column(name="commune", type="string", length=100, nullable=true)
     */
    private $commune;

    /**
     * @var string|null
     *
     * @ORM\Column(name="statut_appareil", type="string", length=0, nullable=true, options={"default"="actif"})
     */
    private $statutAppareil = 'actif';

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="date_enregistrement", type="date", nullable=true)
     */
    private $dateEnregistrement;


}
