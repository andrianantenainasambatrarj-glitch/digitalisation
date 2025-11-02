import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Hero from "../components/Hero";
import { FileText, Heart, Baby, Users, FileCheck, FileWarning, UserMinus, FileUser } from "lucide-react";

const services = [
  {
    title: "Acte de Naissance",
    description: "Demande d'acte de naissance pour officialiser la naissance d'un enfant.",
    link: "/demande/naissance",
    icon: <Baby className="w-8 h-8 text-primary" />,
  },
  {
    title: "Bulletin de Naissance",
    description: "Obtention d'un bulletin de naissance pour des besoins administratifs.",
    link: "/demande/bulletin",
    icon: <FileText className="w-8 h-8 text-primary" />,
  },
  {
    title: "Acte de Mariage",
    description: "Enregistrement officiel d'un mariage.",
    link: "/demande/mariage",
    icon: <Heart className="w-8 h-8 text-primary" />,
  },
  {
    title: "Acte de Reconnaissance",
    description: "Acte pour reconnaître un enfant.",
    link: "/demande/reconnaissance",
    icon: <Users className="w-8 h-8 text-primary" />,
  },
  {
    title: "Acte d'Adoption",
    description: "Procédure d'adoption légale.",
    link: "/demande/adoption",
    icon: <FileUser className="w-8 h-8 text-primary" />,
  },
  {
    title: "Acte de Décès",
    description: "Déclaration de décès.",
    link: "/demande/deces",
    icon: <FileWarning className="w-8 h-8 text-primary" />,
  },
  {
    title: "Acte de Divorce",
    description: "Officialisation d'un divorce.",
    link: "/demande/divorce",
    icon: <UserMinus className="w-8 h-8 text-primary" />,
  },
  {
    title: "Certificat de Célibat",
    description: "Certificat confirmant le statut de célibataire.",
    link: "/demande/celibat",
    icon: <FileCheck className="w-8 h-8 text-primary" />,
  },
];

const ServicesPage = () => {
  return (
    <div className="pb-16">
      {/* Hero Section */}
      <Hero
        title="Services d'État civil"
        subtitle="Choisissez un service pour démarrer votre demande en toute simplicité"
        image="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1600&auto=format&fit=crop"
      />

      {/* Page Header */}
      <PageHeader
        title="Tous les services disponibles"
        subtitle="Sélectionnez un service ci-dessous pour accéder au formulaire correspondant."
      />

      {/* Services Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ scale: 1.03 }}
            className="card border border-base-300 bg-base-100 hover:shadow-2xl hover:border-primary/40 transition-all duration-300"
          >
            <div className="card-body items-center text-center p-6">
              <div className="bg-primary/10 rounded-full p-3 mb-3">{service.icon}</div>
              <h2 className="card-title text-lg md:text-xl font-semibold text-base-content">
                {service.title}
              </h2>
              <p className="text-base-content/70 mt-2 text-sm md:text-base leading-relaxed">
                {service.description}
              </p>
              <div className="card-actions mt-5">
                <Link
                  to={service.link}
                  className="btn btn-primary btn-sm md:btn-md rounded-full px-5"
                >
                  Démarrer la demande
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ServicesPage;
