import { useState, useEffect } from 'react';

export const useOffline = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Synchroniser les demandes en attente
      import('../services/api').then(({ apiService }) => {
        apiService.synchroniserDemandesOffline();
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Charger les demandes en attente du localStorage
    const demandesOffline = JSON.parse(localStorage.getItem('demandes_offline') || '[]');
    setPendingRequests(demandesOffline.filter(d => !d.synced));

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return {
    isOnline,
    pendingRequestsCount: pendingRequests.length
  };
};