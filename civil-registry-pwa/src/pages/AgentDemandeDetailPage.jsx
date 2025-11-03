import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Hero from '../components/Hero';
import { agentApi } from '../services/agentApi';

export default function AgentDemandeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [demande, setDemande] = useState(null);
  const [loading, setLoading] = useState(true);
  const [traitement, setTraitement] = useState({ statut: '', commentaire: '' });
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadDemande();
  }, [id]);

  const loadDemande = async () => {
    try {
      const data = await agentApi.getDemandes();
      const foundDemande = data['hydra:member'].find(d => d.id === parseInt(id));
      setDemande(foundDemande);
    } catch (error) {
      console.error('Erreur lors du chargement de la demande:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleValidation = async () => {
    setProcessing(true);
    try {
      await agentApi.traiterDemande(demande.id, 'validee');
      
      // Créer l'acte officiel
      if (demande.donneesSupplementaires) {
        await creerActeOfficiel();
      }
      
      alert('Demande validée avec succès !');
      navigate('/agent/dashboard');
    } catch (error) {
      alert('Erreur lors de la validation: ' + error.message);
    } finally {
      setProcessing(false);
    }
  };

  const handleRejet = async () => {
    if (!traitement.commentaire.trim()) {
      alert('Veuillez saisir un motif de rejet');
      return;
    }

    setProcessing(true);
    try {
      await agentApi.traiterDemande(demande.id, 'rejetee', traitement.commentaire);
      alert('Demande rejetée');
      navigate('/agent/dashboard');
    } catch (error) {
      alert('Erreur lors du rejet: ' + error.message);
    } finally {
      setProcessing(false);
    }
  };

  const creerActeOfficiel = async () => {
    const data = demande.donneesSupplementaires;
    
    try {
      switch (demande.typeActe) {
        case 'naissance':
          await agentApi.creerActeDepuisDemande(demande.id, 'naissance', {
            nomPere: data.nomPere,
            prenomPere: data.prenomPere,
            nomMere: data.nomMere,
            prenomMere: data.prenomMere,
            dateNaissance: data.dateNaissance,
            lieuNaissance: data.lieuNaissance,
            // Créer le citoyen enfant
            citoyen: {
              nom: data.nomEnfant,
              prenom: data.prenomEnfant,
              sexe: data.sexeEnfant,
              dateNaissance: data.dateNaissance,
              lieuNaissance: data.lieuNaissance,
              nationalite: 'Malagasy'
            }
          });
          break;
          
        case 'mariage':
          await agentApi.creerActeDepuisDemande(demande.id, 'mariage', {
            dateMariage: data.dateMariage,
            lieuMariage: data.lieuMariage,
            regimeMatrimonial: data.regimeMatrimonial,
            // Les citoyens époux et épouse doivent déjà exister
            epoux: { id: data.epouxId },
            epouse: { id: data.epouseId }
          });
          break;
          
        case 'deces':
          await agentApi.creerActeDepuisDemande(demande.id, 'deces', {
            dateDeces: data.dateDeces,
            lieuDeces: data.lieuDeces,
            causeDeces: data.causeDeces,
            citoyen: { id: demande.citoyenId }
          });
          break;
          
        case 'adoption':
          await agentApi.creerActeDepuisDemande(demande.id, 'adoption', {
            nomEnfant: data.enfantNom,
            prenomEnfant: data.enfantPrenom,
            dateNaissanceEnfant: data.dateNaiss,
            nomAdoptant: data.adoptantNom,
            prenomAdoptant: data.adoptantPrenom,
            motif: data.motif,
            commune: data.commune,
            contactAdoptant: data.contact
          });
          break;
          
        // Ajouter les autres types d'actes...
      }
    } catch (error) {
      console.error('Erreur lors de la création de l\'acte officiel:', error);
    }
  };

  const getStatutBadge = (statut) => {
    const classes = {
      'en_cours': 'badge-warning',
      'validee': 'badge-success',
      'rejetee': 'badge-error'
    };
    
    const labels = {
      'en_cours': 'En cours',
      'validee': 'Validée',
      'rejetee': 'Rejetée'
    };

    return <span className={`badge ${classes[statut] || 'badge-neutral'}`}>{labels[statut] || statut}</span>;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (!demande) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="alert alert-error">
          Demande non trouvée
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <Hero
        title={`Demande #${demande.id}`}
        subtitle={`Demande d'acte de ${demande.typeActe}`}
        image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1600&auto=format&fit=crop"
      />

      <PageHeader
        title={`Demande #${demande.id}`}
        subtitle={`Type: ${demande.typeActe} - ${getStatutBadge(demande.statut)}`}
        actions={
          <button 
            onClick={() => navigate('/agent/dashboard')} 
            className="btn btn-outline"
          >
            ← Retour au dashboard
          </button>
        }
      />

      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informations générales */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Informations générales</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <strong>Date de demande:</strong><br />
                    {new Date(demande.dateDemande).toLocaleString('fr-FR')}
                  </div>
                  <div>
                    <strong>Statut:</strong><br />
                    {getStatutBadge(demande.statut)}
                  </div>
                  <div>
                    <strong>Email demandeur:</strong><br />
                    {demande.emailDemandeur}
                  </div>
                  <div>
                    <strong>Téléphone:</strong><br />
                    {demande.telephoneDemandeur}
                  </div>
                </div>

                <div className="mt-6">
                  <strong>Motif de la demande:</strong>
                  <p className="mt-2 p-3 bg-base-200 rounded">{demande.motif}</p>
                </div>

                {/* Données supplémentaires */}
                {demande.donneesSupplementaires && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">Informations détaillées</h3>
                    <div className="bg-base-200 p-4 rounded">
                      {Object.entries(demande.donneesSupplementaires).map(([key, value]) => (
                        <div key={key} className="mb-2">
                          <strong>{key.replace(/_/g, ' ')}:</strong>
                          {typeof value === 'object' ? (
                            <ul className="ml-4 mt-1">
                              {Object.entries(value).map(([subKey, subValue]) => (
                                <li key={subKey}>• {subKey.replace(/_/g, ' ')}: {subValue}</li>
                              ))}
                            </ul>
                          ) : (
                            <span> {value}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Actions</h3>
                
                {demande.statut === 'en_cours' ? (
                  <div className="space-y-3">
                    <button 
                      onClick={handleValidation}
                      disabled={processing}
                      className="btn btn-success w-full"
                    >
                      {processing ? 'Traitement...' : '✅ Valider la demande'}
                    </button>
                    
                    <button 
                      onClick={() => setShowRejectForm(true)}
                      disabled={processing}
                      className="btn btn-error w-full"
                    >
                      ❌ Rejeter la demande
                    </button>
                  </div>
                ) : (
                  <div className="alert alert-info">
                    Cette demande a déjà été traitée
                  </div>
                )}
                
                {demande.commentaireAgent && (
                  <div className="mt-4">
                    <strong>Commentaire de l'agent:</strong>
                    <p className="mt-2 p-3 bg-base-200 rounded">{demande.commentaireAgent}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal de rejet */}
        {showRejectForm && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Motif du rejet</h3>
              <div className="py-4">
                <textarea 
                  className="textarea textarea-bordered w-full" 
                  placeholder="Expliquez pourquoi cette demande est rejetée..."
                  value={traitement.commentaire}
                  onChange={(e) => setTraitement({...traitement, commentaire: e.target.value})}
                  rows={4}
                />
              </div>
              <div className="modal-action">
                <button 
                  onClick={() => setShowRejectForm(false)} 
                  className="btn"
                >
                  Annuler
                </button>
                <button 
                  onClick={handleRejet}
                  disabled={processing}
                  className="btn btn-error"
                >
                  Confirmer le rejet
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}