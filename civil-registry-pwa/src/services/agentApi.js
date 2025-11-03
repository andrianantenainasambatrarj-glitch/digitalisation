const API_BASE_URL = 'http://localhost:8000/api'; // Adapter selon votre configuration

export const agentApi = {
  // Authentification agent
  async login(credentials) {
    try {
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

      const data = await response.json();
      localStorage.setItem('agent_token', data.token);
      return data;
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw error;
    }
  },

  // Vérifier si l'agent est connecté
  isAuthenticated() {
    return !!localStorage.getItem('agent_token');
  },

  // Déconnexion
  logout() {
    localStorage.removeItem('agent_token');
  },

  // Récupérer le token
  getToken() {
    return localStorage.getItem('agent_token');
  },

  // Récupérer toutes les demandes
  async getDemandes() {
    const token = this.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}/demande`, {
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
    const token = this.getToken();
    if (!token) throw new Error('Non authentifié');

    const response = await fetch(`${API_BASE_URL}/demandes/${demandeId}/traiter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        statut: statut,
        commentaire: commentaire
      }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors du traitement de la demande');
    }

    return await response.json();
  },

  // Créer un acte officiel à partir d'une demande
  async creerActeDepuisDemande(demandeId, typeActe, donnees) {
    const token = this.getToken();
    if (!token) throw new Error('Non authentifié');

    const endpoints = {
      naissance: '/naissance',
      mariage: '/mariage',
      deces: '/deces',
      divorce: '/divorce',
      reconnaissance: '/reconnaissance',
      adoption: '/adoption'
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