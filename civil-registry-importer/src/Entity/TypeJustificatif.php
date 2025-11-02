<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * TypeJustificatif
 *
 * @ORM\Table(name="type_justificatif")
 * @ORM\Entity
 */
class TypeJustificatif
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_type_justif", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idTypeJustif;

    /**
     * @var string
     *
     * @ORM\Column(name="nom_type", type="string", length=100, nullable=false)
     */
    private $nomType;

    /**
     * @var string|null
     *
     * @ORM\Column(name="description", type="string", length=150, nullable=true)
     */
    private $description;


}
