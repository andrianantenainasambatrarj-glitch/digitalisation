<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * StatutDemande
 *
 * @ORM\Table(name="statut_demande")
 * @ORM\Entity
 */
class StatutDemande
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_statut", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idStatut;

    /**
     * @var string
     *
     * @ORM\Column(name="nom_statut", type="string", length=50, nullable=false)
     */
    private $nomStatut;

    /**
     * @var string|null
     *
     * @ORM\Column(name="description", type="string", length=255, nullable=true)
     */
    private $description;


}
