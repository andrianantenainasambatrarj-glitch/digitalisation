<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * LivretEnfant
 *
 * @ORM\Table(name="livret_enfant", indexes={@ORM\Index(name="id_livret", columns={"id_livret"}), @ORM\Index(name="id_naissance", columns={"id_naissance"})})
 * @ORM\Entity
 */
class LivretEnfant
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var int|null
     *
     * @ORM\Column(name="id_livret", type="integer", nullable=true)
     */
    private $idLivret;

    /**
     * @var int|null
     *
     * @ORM\Column(name="id_naissance", type="integer", nullable=true)
     */
    private $idNaissance;


}
