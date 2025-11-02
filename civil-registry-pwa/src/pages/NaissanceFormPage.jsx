import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import Hero from "../components/Hero";
import { FiUser, FiPhone, FiMail, FiHome } from "react-icons/fi";

const schema = Yup.object({
  nomEnfant: Yup.string().required("Requis"),
  prenomEnfant: Yup.string().required("Requis"),
  dateNaissance: Yup.date().required("Requis"),
  lieuNaissance: Yup.string().required("Requis"),
  nomPere: Yup.string().required("Requis"),
  prenomPere: Yup.string().required("Requis"),
  nomMere: Yup.string().required("Requis"),
  prenomMere: Yup.string().required("Requis"),
  adresse: Yup.string().required("Requis"),
  contact: Yup.string().required("Requis"),
  email: Yup.string().email("Email invalide").optional(),
});

const NaissanceFormPage = () => {
  return (
    <div className="min-h-screen bg-base-200">
      <Hero
        title="Acte de Naissance"
        subtitle="Soumettez votre demande d’acte de naissance en ligne"
        image="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop"
      />

      <PageHeader
        title="Formulaire de demande"
        subtitle="Veuillez renseigner les informations ci-dessous avec exactitude"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mx-4 md:mx-8 border border-base-300 bg-base-100 shadow-xl mb-12"
      >
        <div className="card-body p-6 md:p-10">
          <Formik
            initialValues={{
              nomEnfant: "",
              prenomEnfant: "",
              dateNaissance: "",
              lieuNaissance: "",
              nomPere: "",
              prenomPere: "",
              nomMere: "",
              prenomMere: "",
              adresse: "",
              contact: "",
              email: "",
            }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              console.log("✅ Données envoyées :", values);
              setSubmitting(false);
              resetForm();
              alert("Votre demande a été soumise avec succès !");
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-8">
                {/* Section enfant */}
                <section>
                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-primary">
                    <FiUser /> Informations de l’enfant
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput name="nomEnfant" label="Nom de l’enfant" />
                    <FormInput name="prenomEnfant" label="Prénom de l’enfant" />
                    <FormInput name="dateNaissance" type="date" label="Date de naissance" />
                    <FormInput name="lieuNaissance" label="Lieu de naissance" />
                  </div>
                </section>

                {/* Section parents */}
                <section>
                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-secondary">
                    <FiUser /> Informations des parents
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput name="nomPere" label="Nom du père" />
                    <FormInput name="prenomPere" label="Prénom du père" />
                    <FormInput name="nomMere" label="Nom de la mère" />
                    <FormInput name="prenomMere" label="Prénom de la mère" />
                  </div>
                </section>

                {/* Section contact */}
                <section>
                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-accent">
                    <FiHome /> Coordonnées du demandeur
                  </h2>
                  <div className="space-y-6">
                    <FormInput name="adresse" label="Adresse complète" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormInput name="contact" label="Contact téléphonique" icon={<FiPhone />} />
                      <FormInput name="email" label="Adresse e-mail" type="email" icon={<FiMail />} />
                    </div>
                  </div>
                </section>

                {/* Submit */}
                <div className="text-center pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary rounded-full px-10 w-full md:w-auto"
                  >
                    {isSubmitting ? "Envoi en cours..." : "Soumettre la demande"}
                  </motion.button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </motion.div>
    </div>
  );
};

// Composant réutilisable pour les champs
const FormInput = ({ name, label, type = "text", icon }) => (
  <div>
    <label className="label font-semibold">{label}</label>
    <div className="relative">
      {icon && <span className="absolute left-3 top-3 text-base-content/50">{icon}</span>}
      <Field
        name={name}
        type={type}
        className={`input input-bordered w-full ${icon ? "pl-10" : ""}`}
      />
    </div>
    <ErrorMessage name={name} component="div" className="text-error text-sm mt-1" />
  </div>
);

export default NaissanceFormPage;
