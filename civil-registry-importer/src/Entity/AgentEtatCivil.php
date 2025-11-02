<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * AgentEtatCivil
 *
 * @ORM\Table(name="agent_etat_civil", uniqueConstraints={@ORM\UniqueConstraint(name="login", columns={"login"})})
 * @ORM\Entity
 */
class AgentEtatCivil
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_agent", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idAgent;

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
     * @var string|null
     *
     * @ORM\Column(name="fonction", type="string", length=100, nullable=true)
     */
    private $fonction;

    /**
     * @var string
     *
     * @ORM\Column(name="login", type="string", length=50, nullable=false)
     */
    private $login;

    /**
     * @var string
     *
     * @ORM\Column(name="mot_de_passe", type="string", length=200, nullable=false)
     */
    private $motDePasse;


}
