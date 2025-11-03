const API_BASE_URL = 'http://localhost:8000/api'; // À adapter selon votre configuration

export const apiService = {
  async createDemande(demandeData) {
    try {
      const response = await fetch(`${API_BASE_URL}/demandes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(demandeData),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la demande:', error);
      throw error;
    }
  },

  async getCitoyens() {
    try {
      const response = await fetch(`${API_BASE_URL}/citoyen`);
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des citoyens:', error);
      throw error;
    }
  }
};