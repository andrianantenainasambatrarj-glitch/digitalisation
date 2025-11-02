<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * BulletinNaissance
 *
 * @ORM\Table(name="bulletin_naissance", indexes={@ORM\Index(name="id_naissance", columns={"id_naissance"})})
 * @ORM\Entity
 */
class BulletinNaissance
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_bulletin", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idBulletin;

    /**
     * @var int
     *
     * @ORM\Column(name="id_naissance", type="integer", nullable=false)
     */
    private $idNaissance;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_demande", type="date", nullable=false)
     */
    private $dateDemande;

    /**
     * @var string|null
     *
     * @ORM\Column(name="extrait_infos", type="string", length=500, nullable=true)
     */
    private $extraitInfos;


}
