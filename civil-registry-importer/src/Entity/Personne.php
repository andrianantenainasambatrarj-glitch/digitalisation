<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Personne
 *
 * @ORM\Table(name="personne", uniqueConstraints={@ORM\UniqueConstraint(name="nin", columns={"nin"})})
 * @ORM\Entity
 */
class Personne
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_personne", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idPersonne;

    /**
     * @var string|null
     *
     * @ORM\Column(name="nin", type="string", length=50, nullable=true)
     */
    private $nin;

    /**
     * @var string
     *
     * @ORM\Column(name="nom", type="string", length=100, nullable=false)
     */
    private $nom;

    /**
     * @var string
     *
     * @ORM\Column(name="prenom", type="string", length=100, nullable=false)
     */
    private $prenom;

    /**
     * @var string
     *
     * @ORM\Column(name="sexe", type="string", length=1, nullable=false, options={"fixed"=true})
     */
    private $sexe;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="date_naissance", type="date", nullable=true)
     */
    private $dateNaissance;

    /**
     * @var string|null
     *
     * @ORM\Column(name="lieu_naissance", type="string", length=150, nullable=true)
     */
    private $lieuNaissance;

    /**
     * @var string|null
     *
     * @ORM\Column(name="profession", type="string", length=100, nullable=true)
     */
    private $profession;

    /**
     * @var string|null
     *
     * @ORM\Column(name="nationalite", type="string", length=50, nullable=true, options={"default"="Malgache"})
     */
    private $nationalite = 'Malgache';

    /**
     * @var string|null
     *
     * @ORM\Column(name="adresse", type="string", length=200, nullable=true)
     */
    private $adresse;


}
