const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Cache local pour le mode hors ligne
const localCache = {
  demandes: [],
  citoyens: [],
  lastSync: null
};

export const apiService = {
  // ✅ FONCTION MANQUANTE - AJOUTÉE
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

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la demande:', error);
      throw error;
    }
  },

  // Authentification persistante
  async authenticateCitoyen(citoyenData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(citoyenData),
      });

      if (!response.ok) throw new Error('Authentification échouée');

      const data = await response.json();
      
      // Stocker le token de manière persistante
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('citoyen_info', JSON.stringify(data.citoyen));
      
      return data;
    } catch (error) {
      console.error('Erreur d\'authentification:', error);
      throw error;
    }
  },

  // Vérifier l'état de connexion
  isAuthenticated() {
    return !!localStorage.getItem('auth_token');
  },

  // Déconnexion
  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('citoyen_info');
  },

  // Soumettre une demande avec vérification automatique (fonction alternative)
  async soumettreDemande(typeActe, donnees) {
    const token = localStorage.getItem('auth_token');
    
    try {
      const response = await fetch(`${API_BASE_URL}/demandes/verifier`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          typeActe: typeActe,
          donnees: donnees
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Erreur lors de la vérification');
      }

      // Si la demande est valide, générer le PDF et imprimer
      if (result.valide && result.pdfUrl) {
        await this.imprimerDocument(result.pdfUrl);
        return {
          ...result,
          status: 'impression_en_cours'
        };
      }

      return result;

    } catch (error) {
      // Mode hors ligne : stocker localement
      if (!navigator.onLine) {
        this.stockerDemandeLocalement(typeActe, donnees);
        return {
          valide: true,
          message: 'Demande stockée localement, sera traitée lors de la reconnexion',
          status: 'stocke_localement'
        };
      }
      
      throw error;
    }
  },

  // Imprimer un document
  async imprimerDocument(pdfUrl) {
    try {
      // Pour l'impression automatique côté client
      const printWindow = window.open(pdfUrl, '_blank');
      
      if (printWindow) {
        printWindow.onload = () => {
          printWindow.print();
          setTimeout(() => printWindow.close(), 1000);
        };
      }
    } catch (error) {
      console.error('Erreur d\'impression:', error);
    }
  },

  // Mode hors ligne
  stockerDemandeLocalement(typeActe, donnees) {
    const demandes = JSON.parse(localStorage.getItem('demandes_offline') || '[]');
    demandes.push({
      id: Date.now(),
      typeActe,
      donnees,
      timestamp: new Date().toISOString(),
      synced: false
    });
    
    localStorage.setItem('demandes_offline', JSON.stringify(demandes));
  },

  // Synchroniser les demandes hors ligne
  async synchroniserDemandesOffline() {
    const demandes = JSON.parse(localStorage.getItem('demandes_offline') || '[]');
    
    for (const demande of demandes) {
      if (!demande.synced) {
        try {
          await this.soumettreDemande(demande.typeActe, demande.donnees);
          demande.synced = true;
        } catch (error) {
          console.error('Erreur de synchronisation:', error);
        }
      }
    }

    // Nettoyer les demandes synchronisées
    const demandesRestantes = demandes.filter(d => !d.synced);
    localStorage.setItem('demandes_offline', JSON.stringify(demandesRestantes));
  },

  // État de connexion
  getConnectionStatus() {
    return navigator.onLine ? 'online' : 'offline';
  }
};