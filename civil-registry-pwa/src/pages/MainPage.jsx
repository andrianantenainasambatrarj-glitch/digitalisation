import React from "react";
import {
  FiUsers,
  FiHeart,
  FiBookOpen,
  FiFileText,
  FiArrowRightCircle,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiBook,
  FiHelpCircle,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";

const MainPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const stats = [
    {
      label: "Actes de naissance",
      value: "1 254",
      trend: "+12%",
      icon: FiUsers,
      color: "from-blue-500 to-blue-700",
    },
    {
      label: "Actes de mariage",
      value: "742",
      trend: "+8%",
      icon: FiHeart,
      color: "from-pink-500 to-pink-700",
    },
    {
      label: "Actes de décès",
      value: "389",
      trend: "-2%",
      icon: FiBookOpen,
      color: "from-gray-500 to-gray-700",
    },
    {
      label: "Demandes en cours",
      value: "27",
      trend: "+5%",
      icon: FiFileText,
      color: "from-green-500 to-green-700",
    },
  ];

  const recentRequests = [
    {
      id: 1001,
      type: "Acte de naissance",
      status: "En traitement",
      icon: FiClock,
      color: "badge-warning",
    },
    {
      id: 1002,
      type: "Acte de mariage",
      status: "Validée",
      icon: FiCheckCircle,
      color: "badge-success",
    },
    {
      id: 1003,
      type: "Acte de décès",
      status: "Rejetée",
      icon: FiAlertCircle,
      color: "badge-error",
    },
    {
      id: 1004,
      type: "Bulletin de naissance",
      status: "En validation",
      icon: FiBook,
      color: "badge-info",
    },
    {
      id: 1005,
      type: "Certificat de célibat",
      status: "En traitement",
      icon: FiClock,
      color: "badge-warning",
    },
  ];

  const quickActions = [
    { to: "/naissance", label: "Naissance", icon: FiUsers, color: "btn-primary" },
    { to: "/mariage", label: "Mariage", icon: FiHeart, color: "btn-secondary" },
    { to: "/deces", label: "Décès", icon: FiBookOpen, color: "btn-accent" },
    { to: "/reconnaissance", label: "Reconnaissance", icon: FiFileText, color: "btn-info" },
    { to: "/adoption", label: "Adoption", icon: FiHeart, color: "btn-warning" },
    { to: "/divorce", label: "Divorce", icon: FiAlertCircle, color: "btn-error" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-300">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 animate-pulse opacity-30"></div>
        <PageHeader
          title="Portail de l'État Civil"
          subtitle="Commune Rurale — Digitalisation & Modernisation des Services"
          actions={
            <Link to="/services" className="btn btn-primary btn-sm">
              Accéder aux services <FiArrowRightCircle className="ml-2 w-4 h-4" />
            </Link>
          }
        />
      </div>

      {/* Stats */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6"
      >
        {stats.map((stat, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div
              className={`rounded-2xl p-5 shadow-lg bg-gradient-to-br ${stat.color} text-white hover:shadow-xl transform hover:-translate-y-1 transition-all`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm opacity-90">{stat.label}</p>
                  <h2 className="text-3xl font-bold">{stat.value}</h2>
                  <span className="text-xs opacity-80">{stat.trend}</span>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <stat.icon className="w-7 h-7" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Actions rapides */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="card mt-8 mx-6 border border-base-300 bg-base-100 shadow-xl"
      >
        <div className="card-body p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-base-content flex items-center gap-3">
              <FiFileText className="text-primary w-6 h-6" /> Actions rapides
            </h3>
            <Link to="/services" className="link link-primary text-sm">
              Tous les services →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickActions.map((a, i) => (
              <motion.div key={i} whileHover={{ scale: 1.05 }}>
                <Link
                  to={a.to}
                  className={`${a.color} btn flex flex-col gap-2 py-4 rounded-2xl shadow-md text-white`}
                >
                  <a.icon className="w-6 h-6" />
                  <span>{a.label}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Activité récente & Assistance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 mx-6">
        {/* Demandes récentes */}
        <motion.div
          variants={itemVariants}
          className="card border border-base-300 bg-base-100 shadow-xl lg:col-span-2"
        >
          <div className="card-body p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold flex items-center gap-3 text-base-content">
                <FiClock className="text-warning w-6 h-6" />
                Demandes récentes
              </h3>
              <Link to="/demandes" className="btn btn-outline btn-sm">
                Voir tout
              </Link>
            </div>
            <ul className="space-y-4">
              {recentRequests.map((r, i) => (
                <motion.li
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  className="p-4 bg-base-200 rounded-xl flex justify-between items-center hover:bg-base-300 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-base-300 rounded-full">
                      <r.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{r.type}</p>
                      <p className="text-xs opacity-60">#{r.id} • Il y a 2h</p>
                    </div>
                  </div>
                  <span className={`badge ${r.color}`}>{r.status}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Assistance */}
        <motion.div
          variants={itemVariants}
          className="card border border-base-300 bg-base-100 shadow-xl"
        >
          <div className="card-body p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-base-content">
              <FiHelpCircle className="text-info w-6 h-6" />
              Assistance citoyenne
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Faire une demande en ligne", icon: FiBook },
                { label: "Documents nécessaires", icon: FiFileText },
                { label: "Contacter la mairie", icon: FiUsers },
                { label: "Suivre ma demande", icon: FiClock },
              ].map((g, i) => (
                <motion.li key={i} whileHover={{ x: 4 }}>
                  <Link
                    to="/guides"
                    className="flex items-center gap-3 p-3 bg-base-200 hover:bg-base-300 rounded-lg transition"
                  >
                    <g.icon className="text-info w-5 h-5" /> {g.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-6">
              <Link to="/services" className="btn btn-primary w-full">
                Commencer une démarche <FiArrowRightCircle className="ml-2" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="mt-12 p-6 text-center text-sm bg-gradient-to-r from-primary/10 via-base-200 to-secondary/10 text-base-content/70 border-t border-base-300">
        © 2025 Digitalisation de l'État Civil — Commune Rurale • Tous droits réservés
      </footer>
    </div>
  );
};

export default MainPage;
