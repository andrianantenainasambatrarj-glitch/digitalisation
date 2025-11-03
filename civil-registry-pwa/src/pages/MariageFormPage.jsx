import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PageHeader from "../components/PageHeader";
import Hero from "../components/Hero";
import { apiService } from "../services/api";

const schema = Yup.object({
  // Informations époux
  nomEpoux: Yup.string().required("Le nom de l'époux est obligatoire"),
  prenomEpoux: Yup.string().required("Le prénom de l'époux est obligatoire"),
  dateNaissanceEpoux: Yup.date().required("La date de naissance de l'époux est obligatoire"),
  
  // Informations épouse
  nomEpouse: Yup.string().required("Le nom de l'épouse est obligatoire"),
  prenomEpouse: Yup.string().required("Le prénom de l'épouse est obligatoire"),
  dateNaissanceEpouse: Yup.date().required("La date de naissance de l'épouse est obligatoire"),
  
  // Informations mariage
  dateMariage: Yup.date().required("La date du mariage est obligatoire"),
  lieuMariage: Yup.string().required("Le lieu du mariage est obligatoire"),
  regimeMatrimonial: Yup.string().optional(),
  
  // Informations demande
  motif: Yup.string().required("Le motif de la demande est obligatoire"),
  emailDemandeur: Yup.string().email("Email invalide").required("L'email est obligatoire"),
  telephoneDemandeur: Yup.string().required("Le téléphone est obligatoire"),
  
  // Optionnel
  citoyenId: Yup.number().integer().optional(),
});

export default function MariageFormPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  return (
    <div>
      <Hero
        title="Acte de mariage"
        subtitle="Demande officielle en ligne"
        image="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1600&auto=format&fit=crop"
      />
      <PageHeader title="Demande d'acte de mariage" subtitle="Renseignez les informations du couple et de la célébration" />

      {submitMessage && (
        <div className={`alert ${submitMessage.includes('succès') ? 'alert-success' : 'alert-error'} mx-4 md:mx-8 mb-4`}>
          {submitMessage}
        </div>
      )}

      <div className="card border border-base-300 bg-base-100 mx-4 md:mx-8 mb-12">
        <div className="card-body p-6">
          <Formik
            initialValues={{
              nomEpoux: "",
              prenomEpoux: "",
              dateNaissanceEpoux: "",
              nomEpouse: "",
              prenomEpouse: "",
              dateNaissanceEpouse: "",
              dateMariage: "",
              lieuMariage: "",
              regimeMatrimonial: "",
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
                  typeActe: "mariage",
                  citoyenId: values.citoyenId || null,
                  motif: values.motif,
                  emailDemandeur: values.emailDemandeur,
                  telephoneDemandeur: values.telephoneDemandeur,
                  statut: "en_cours",
                  donneesSupplementaires: {
                    // Informations époux
                    nomEpoux: values.nomEpoux,
                    prenomEpoux: values.prenomEpoux,
                    dateNaissanceEpoux: values.dateNaissanceEpoux,
                    // Informations épouse
                    nomEpouse: values.nomEpouse,
                    prenomEpouse: values.prenomEpouse,
                    dateNaissanceEpouse: values.dateNaissanceEpouse,
                    // Informations mariage
                    dateMariage: values.dateMariage,
                    lieuMariage: values.lieuMariage,
                    regimeMatrimonial: values.regimeMatrimonial,
                  }
                };

                const result = await apiService.createDemande(demandeData);
                setSubmitMessage("Votre demande d'acte de mariage a été soumise avec succès !");
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
              <Form className="space-y-6">
                {/* Section époux */}
                <section>
                  <h3 className="text-lg font-bold mb-4 text-primary">Informations de l'époux</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <FormInput name="nomEpoux" label="Nom" />
                    <FormInput name="prenomEpoux" label="Prénom" />
                    <FormInput name="dateNaissanceEpoux" type="date" label="Date de naissance" />
                  </div>
                </section>

                {/* Section épouse */}
                <section>
                  <h3 className="text-lg font-bold mb-4 text-secondary">Informations de l'épouse</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <FormInput name="nomEpouse" label="Nom" />
                    <FormInput name="prenomEpouse" label="Prénom" />
                    <FormInput name="dateNaissanceEpouse" type="date" label="Date de naissance" />
                  </div>
                </section>

                {/* Section mariage */}
                <section>
                  <h3 className="text-lg font-bold mb-4 text-accent">Informations du mariage</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormInput name="dateMariage" type="date" label="Date du mariage" />
                    <FormInput name="lieuMariage" label="Lieu du mariage" />
                  </div>
                  <div className="mt-4">
                    <FormInput name="regimeMatrimonial" label="Régime matrimonial (optionnel)" />
                  </div>
                </section>

                {/* Section demande */}
                <section>
                  <h3 className="text-lg font-bold mb-4 text-info">Informations de la demande</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="label font-semibold">Motif de la demande</label>
                      <Field as="textarea" name="motif" className="textarea textarea-bordered w-full" 
                             placeholder="Expliquez pourquoi vous demandez cet acte de mariage" />
                      <ErrorMessage name="motif" component="div" className="text-error text-sm mt-1" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormInput name="telephoneDemandeur" label="Téléphone" />
                      <FormInput name="emailDemandeur" label="Email" type="email" />
                    </div>
                    <FormInput name="citoyenId" type="number" label="ID Citoyen (si connu)" />
                  </div>
                </section>

                <div className="text-center pt-2">
                  <button 
                    type="submit" 
                    disabled={isSubmitting || formikSubmitting} 
                    className="btn btn-primary rounded-full w-full md:w-auto px-10"
                  >
                    {isSubmitting ? "Envoi..." : "Soumettre la demande"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

// Composant réutilisable pour les champs
const FormInput = ({ name, label, type = "text" }) => (
  <div>
    <label className="label font-semibold">{label}</label>
    <Field name={name} type={type} className="input input-bordered w-full" />
    <ErrorMessage name={name} component="div" className="text-error text-sm mt-1" />
  </div>
);