import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import Hero from "../components/Hero";
import { FiUser, FiPhone, FiMail, FiHome } from "react-icons/fi";
import { apiService } from "../services/api";

const schema = Yup.object({
  // Informations de l'enfant
  nomEnfant: Yup.string().required("Le nom de l'enfant est obligatoire"),
  prenomEnfant: Yup.string().required("Le prénom de l'enfant est obligatoire"),
  sexeEnfant: Yup.string().oneOf(['M', 'F'], 'Le sexe doit être M ou F').required("Le sexe est obligatoire"),
  dateNaissance: Yup.date().required("La date de naissance est obligatoire"),
  lieuNaissance: Yup.string().required("Le lieu de naissance est obligatoire"),
  
  // Informations des parents
  nomPere: Yup.string().required("Le nom du père est obligatoire"),
  prenomPere: Yup.string().required("Le prénom du père est obligatoire"),
  nomMere: Yup.string().required("Le nom de la mère est obligatoire"),
  prenomMere: Yup.string().required("Le prénom de la mère est obligatoire"),
  
  // Informations du demandeur
  motif: Yup.string().required("Le motif de la demande est obligatoire"),
  emailDemandeur: Yup.string().email("Email invalide").required("L'email est obligatoire"),
  telephoneDemandeur: Yup.string().required("Le téléphone est obligatoire"),
  
  // Optionnel
  citoyenId: Yup.number().integer().optional(),
});

const NaissanceFormPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  return (
    <div className="min-h-screen bg-base-200">
      <Hero
        title="Acte de Naissance"
        subtitle="Soumettez votre demande d'acte de naissance en ligne"
        image="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop"
      />

      <PageHeader
        title="Demande d'acte de naissance"
        subtitle="Renseignez les informations complètes de l'enfant et des parents"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mx-4 md:mx-8 border border-base-300 bg-base-100 shadow-xl mb-12"
      >
        <div className="card-body p-6 md:p-10">
          {submitMessage && (
            <div className={`alert ${submitMessage.includes('succès') ? 'alert-success' : 'alert-error'} mb-4`}>
              {submitMessage}
            </div>
          )}
          
          <Formik
            initialValues={{
              nomEnfant: "",
              prenomEnfant: "",
              sexeEnfant: "",
              dateNaissance: "",
              lieuNaissance: "",
              nomPere: "",
              prenomPere: "",
              nomMere: "",
              prenomMere: "",
              motif: "",
              emailDemandeur: "",
              telephoneDemandeur: "",
              citoyenId: "",
            }}
            validationSchema={schema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setIsSubmitting(true);
              setSubmitMessage("");
              
              try {
                const demandeData = {
                  typeActe: "naissance",
                  citoyenId: values.citoyenId || null,
                  motif: values.motif,
                  emailDemandeur: values.emailDemandeur,
                  telephoneDemandeur: values.telephoneDemandeur,
                  statut: "en_cours",
                  donneesSupplementaires: {
                    // Informations de l'enfant (pour création future)
                    nomEnfant: values.nomEnfant,
                    prenomEnfant: values.prenomEnfant,
                    sexeEnfant: values.sexeEnfant,
                    dateNaissance: values.dateNaissance,
                    lieuNaissance: values.lieuNaissance,
                    // Informations des parents
                    nomPere: values.nomPere,
                    prenomPere: values.prenomPere,
                    nomMere: values.nomMere,
                    prenomMere: values.prenomMere,
                  }
                };

                const result = await apiService.createDemande(demandeData);
                setSubmitMessage("Votre demande d'acte de naissance a été soumise avec succès !");
                resetForm();
              } catch (error) {
                setSubmitMessage("Erreur lors de l'envoi de la demande. Veuillez réessayer.");
                console.error("Erreur:", error);
              } finally {
                setIsSubmitting(false);
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting: formikSubmitting }) => (
              <Form className="space-y-8">
                {/* Section enfant */}
                <section>
                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-primary">
                    <FiUser /> Informations de l'enfant
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput name="nomEnfant" label="Nom de l'enfant" />
                    <FormInput name="prenomEnfant" label="Prénom de l'enfant" />
                    <div>
                      <label className="label font-semibold">Sexe de l'enfant</label>
                      <Field as="select" name="sexeEnfant" className="select select-bordered w-full">
                        <option value="">Sélectionner</option>
                        <option value="M">Masculin</option>
                        <option value="F">Féminin</option>
                      </Field>
                      <ErrorMessage name="sexeEnfant" component="div" className="text-error text-sm mt-1" />
                    </div>
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

                {/* Section demande */}
                <section>
                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-accent">
                    <FiHome /> Informations de la demande
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="label font-semibold">Motif de la demande</label>
                      <Field as="textarea" name="motif" className="textarea textarea-bordered w-full" 
                             placeholder="Expliquez pourquoi vous demandez cet acte de naissance" />
                      <ErrorMessage name="motif" component="div" className="text-error text-sm mt-1" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormInput name="telephoneDemandeur" label="Téléphone" icon={<FiPhone />} />
                      <FormInput name="emailDemandeur" label="Email" type="email" icon={<FiMail />} />
                    </div>
                    <FormInput name="citoyenId" type="number" label="ID Citoyen (si connu)" />
                  </div>
                </section>

                {/* Submit */}
                <div className="text-center pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={isSubmitting || formikSubmitting}
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