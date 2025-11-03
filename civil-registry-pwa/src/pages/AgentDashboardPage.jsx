import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Hero from '../components/Hero';
import { agentApi } from '../services/agentApi';

export default function AgentDashboardPage() {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    loadDemandes();
  }, []);

  const loadDemandes = async () => {
    try {
      const data = await agentApi.getDemandes();
      setDemandes(data['hydra:member'] || []);
    } catch (error) {
      console.error('Erreur lors du chargement des demandes:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDemandes = demandes.filter(demande => {
    if (filter === 'all') return true;
    return demande.statut === filter;
  });

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

  const logout = () => {
    localStorage.removeItem('agent_token');
    navigate('/agent/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <Hero
        title="Tableau de bord Agent"
        subtitle="Gestion des demandes d'actes"
        image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1600&auto=format&fit=crop"
      />

      <PageHeader
        title="Demandes d'actes"
        subtitle="Gérez et traitez les demandes des citoyens"
        actions={
          <button onClick={logout} className="btn btn-outline btn-error">
            Déconnexion
          </button>
        }
      />

      <div className="container mx-auto px-4 pb-8">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body text-center">
              <h3 className="text-lg font-semibold">Total</h3>
              <p className="text-3xl font-bold text-primary">{demandes.length}</p>
            </div>
          </div>
          <div className="card bg-warning shadow-xl">
            <div className="card-body text-center">
              <h3 className="text-lg font-semibold">En cours</h3>
              <p className="text-3xl font-bold text-white">
                {demandes.filter(d => d.statut === 'en_cours').length}
              </p>
            </div>
          </div>
          <div className="card bg-success shadow-xl">
            <div className="card-body text-center">
              <h3 className="text-lg font-semibold">Validées</h3>
              <p className="text-3xl font-bold text-white">
                {demandes.filter(d => d.statut === 'validee').length}
              </p>
            </div>
          </div>
          <div className="card bg-error shadow-xl">
            <div className="card-body text-center">
              <h3 className="text-lg font-semibold">Rejetées</h3>
              <p className="text-3xl font-bold text-white">
                {demandes.filter(d => d.statut === 'rejetee').length}
              </p>
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="mb-6">
          <div className="tabs tabs-boxed">
            <button 
              className={`tab ${filter === 'all' ? 'tab-active' : ''}`}
              onClick={() => setFilter('all')}
            >
              Toutes ({demandes.length})
            </button>
            <button 
              className={`tab ${filter === 'en_cours' ? 'tab-active' : ''}`}
              onClick={() => setFilter('en_cours')}
            >
              En cours ({demandes.filter(d => d.statut === 'en_cours').length})
            </button>
            <button 
              className={`tab ${filter === 'validee' ? 'tab-active' : ''}`}
              onClick={() => setFilter('validee')}
            >
              Validées ({demandes.filter(d => d.statut === 'validee').length})
            </button>
            <button 
              className={`tab ${filter === 'rejetee' ? 'tab-active' : ''}`}
              onClick={() => setFilter('rejetee')}
            >
              Rejetées ({demandes.filter(d => d.statut === 'rejetee').length})
            </button>
          </div>
        </div>

        {/* Liste des demandes */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Demandes</h2>

            {filteredDemandes.length === 0 ? (
              <p className="text-center py-8 text-base-content/60">
                Aucune demande trouvée
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Type d'acte</th>
                      <th>Date de demande</th>
                      <th>Email demandeur</th>
                      <th>Statut</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDemandes.map((demande) => (
                      <tr key={demande.id}>
                        <td>{demande.id}</td>
                        <td className="font-semibold capitalize">{demande.typeActe}</td>
                        <td>{new Date(demande.dateDemande).toLocaleDateString('fr-FR')}</td>
                        <td>{demande.emailDemandeur}</td>
                        <td>{getStatutBadge(demande.statut)}</td>
                        <td>
                          <Link 
                            to={`/agent/demandes/${demande.id}`}
                            className="btn btn-sm btn-primary"
                          >
                            Voir détails
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}