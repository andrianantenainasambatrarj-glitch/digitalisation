const API_BASE_URL = 'http://localhost:8000/api'; // Adapter selon votre configuration

export const agentApi = {
  // Authentification agent
  async login(credentials) {
    const response = await fetch(`${API_BASE_URL}/login_check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Identifiants incorrects');
    }

    return await response.json();
  },

  // Récupérer toutes les demandes
  async getDemandes() {
    const token = localStorage.getItem('agent_token');
    const response = await fetch(`${API_BASE_URL}/demande_acte`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des demandes');
    }

    return await response.json();
  },

  // Traiter une demande
  async traiterDemande(demandeId, statut, commentaire = '') {
    const token = localStorage.getItem('agent_token');
    const response = await fetch(`${API_BASE_URL}/demandes/${demandeId}/traiter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        statut: statut,
        commentaire: commentaire,
      }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors du traitement de la demande');
    }

    return await response.json();
  },

  // Créer un acte officiel à partir d'une demande
  async creerActeDepuisDemande(demandeId, typeActe, donnees) {
    const token = localStorage.getItem('agent_token');
    const endpoints = {
      naissance: '/naissance',
      mariage: '/mariage',
      deces: '/deces',
      divorce: '/divorce',
      reconnaissance: '/reconnaissance',
      adoption: '/acte_adoption'
    };

    const response = await fetch(`${API_BASE_URL}${endpoints[typeActe]}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(donnees),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la création de l\'acte');
    }

    return await response.json();
  }
};