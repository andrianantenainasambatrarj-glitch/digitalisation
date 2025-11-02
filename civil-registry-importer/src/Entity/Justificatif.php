<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Justificatif
 *
 * @ORM\Table(name="justificatif", indexes={@ORM\Index(name="id_demande", columns={"id_demande"}), @ORM\Index(name="id_type_justif", columns={"id_type_justif"})})
 * @ORM\Entity
 */
class Justificatif
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_justif", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idJustif;

    /**
     * @var int
     *
     * @ORM\Column(name="id_demande", type="integer", nullable=false)
     */
    private $idDemande;

    /**
     * @var int|null
     *
     * @ORM\Column(name="id_type_justif", type="integer", nullable=true)
     */
    private $idTypeJustif;

    /**
     * @var string|null
     *
     * @ORM\Column(name="chemin_fichier", type="string", length=255, nullable=true)
     */
    private $cheminFichier;

    /**
     * @var string|null
     *
     * @ORM\Column(name="nom_original", type="string", length=100, nullable=true)
     */
    private $nomOriginal;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="date_ajout", type="datetime", nullable=true, options={"default"="CURRENT_TIMESTAMP"})
     */
    private $dateAjout = 'CURRENT_TIMESTAMP';

    /**
     * @var string|null
     *
     * @ORM\Column(name="valide", type="string", length=0, nullable=true, options={"default"="en_attente"})
     */
    private $valide = 'en_attente';

    /**
     * @var string|null
     *
     * @ORM\Column(name="commentaire", type="string", length=150, nullable=true)
     */
    private $commentaire;


}
