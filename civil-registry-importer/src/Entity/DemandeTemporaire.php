<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * DemandeTemporaire
 *
 * @ORM\Table(name="demande_temporaire", indexes={@ORM\Index(name="id_appareil", columns={"id_appareil"}), @ORM\Index(name="id_statut", columns={"id_statut"})})
 * @ORM\Entity
 */
class DemandeTemporaire
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_temp", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idTemp;

    /**
     * @var string
     *
     * @ORM\Column(name="type_acte", type="string", length=0, nullable=false)
     */
    private $typeActe;

    /**
     * @var string
     *
     * @ORM\Column(name="contenu_json", type="text", length=65535, nullable=false)
     */
    private $contenuJson;

    /**
     * @var int|null
     *
     * @ORM\Column(name="id_appareil", type="integer", nullable=true)
     */
    private $idAppareil;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="date_saisie", type="datetime", nullable=true, options={"default"="CURRENT_TIMESTAMP"})
     */
    private $dateSaisie = 'CURRENT_TIMESTAMP';

    /**
     * @var int|null
     *
     * @ORM\Column(name="id_statut", type="integer", nullable=true, options={"default"="1"})
     */
    private $idStatut = 1;

    /**
     * @var string|null
     *
     * @ORM\Column(name="commentaire", type="string", length=150, nullable=true)
     */
    private $commentaire;


}
