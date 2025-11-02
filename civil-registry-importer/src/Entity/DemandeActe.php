<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * DemandeActe
 *
 * @ORM\Table(name="demande_acte", indexes={@ORM\Index(name="id_agent_validateur", columns={"id_agent_validateur"}), @ORM\Index(name="id_appareil", columns={"id_appareil"}), @ORM\Index(name="id_personne", columns={"id_personne"}), @ORM\Index(name="id_statut", columns={"id_statut"})})
 * @ORM\Entity
 */
class DemandeActe
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_demande", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idDemande;

    /**
     * @var string
     *
     * @ORM\Column(name="type_acte", type="string", length=0, nullable=false)
     */
    private $typeActe;

    /**
     * @var int|null
     *
     * @ORM\Column(name="id_personne", type="integer", nullable=true)
     */
    private $idPersonne;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="date_demande", type="datetime", nullable=true, options={"default"="CURRENT_TIMESTAMP"})
     */
    private $dateDemande = 'CURRENT_TIMESTAMP';

    /**
     * @var int|null
     *
     * @ORM\Column(name="id_appareil", type="integer", nullable=true)
     */
    private $idAppareil;

    /**
     * @var int|null
     *
     * @ORM\Column(name="id_statut", type="integer", nullable=true, options={"default"="1"})
     */
    private $idStatut = 1;

    /**
     * @var string|null
     *
     * @ORM\Column(name="commentaire", type="string", length=200, nullable=true)
     */
    private $commentaire;

    /**
     * @var int|null
     *
     * @ORM\Column(name="id_agent_validateur", type="integer", nullable=true)
     */
    private $idAgentValidateur;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="date_validation", type="datetime", nullable=true)
     */
    private $dateValidation;

    /**
     * @var int|null
     *
     * @ORM\Column(name="id_acte_lie", type="integer", nullable=true)
     */
    private $idActeLie;


}
