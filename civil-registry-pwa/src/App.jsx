import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ServicesPage from "./pages/ServicesPage";

// 📄 Importation des pages de formulaires
import NaissanceFormPage from "./pages/NaissanceFormPage";
import BulletinNaissancePage from "./pages/BulletinNaissancePage";
import MariageFormPage from "./pages/MariageFormPage";
import ReconnaissanceFormPage from "./pages/ReconnaissanceFormPage";
import AdoptionFormPage from "./pages/AdoptionFormPage";
import DecesFormPage from "./pages/DecesFormPage";
import DivorceFormPage from "./pages/DivorceFormPage";
import CertificatCelibatPage from "./pages/CertificatCelibatPage";
import AgentLoginPage from './pages/AgentLoginPage';
import AgentDashboardPage from './pages/AgentDashboardPage';
import AgentDemandeDetailPage from './pages/AgentDemandeDetailPage';


function App() {
  return (
    <Router>
      <Routes>
        {/* 🏠 Page d’accueil */}
        <Route path="/" element={<MainPage />} />

        {/* 📋 Liste des services */}
        <Route path="/services" element={<ServicesPage />} />

        {/* 🧾 Formulaires de services */}
        <Route path="/demande/naissance" element={<NaissanceFormPage />} />
        <Route path="/demande/bulletin" element={<BulletinNaissancePage />} />
        <Route path="/demande/mariage" element={<MariageFormPage />} />
        <Route path="/demande/reconnaissance" element={<ReconnaissanceFormPage />} />
        <Route path="/demande/adoption" element={<AdoptionFormPage />} />
        <Route path="/demande/deces" element={<DecesFormPage />} />
        <Route path="/demande/divorce" element={<DivorceFormPage />} />
        <Route path="/demande/celibat" element={<CertificatCelibatPage />} />
        <Route path="/agent/login" element={<AgentLoginPage />} />
        <Route path="/agent/dashboard" element={<AgentDashboardPage />} />
        <Route path="/agent/demandes/:id" element={<AgentDemandeDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
