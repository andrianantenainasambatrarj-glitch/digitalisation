import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PageHeader from "../components/PageHeader";
import Hero from "../components/Hero";
import { apiService } from "../services/api";

const schema = Yup.object({
  // Informations du défunt
  nomDefunt: Yup.string().required("Le nom du défunt est obligatoire"),
  prenomDefunt: Yup.string().required("Le prénom du défunt est obligatoire"),
  dateNaissanceDefunt: Yup.date().required("La date de naissance est obligatoire"),
  dateDeces: Yup.date().required("La date du décès est obligatoire"),
  lieuDeces: Yup.string().required("Le lieu du décès est obligatoire"),
  causeDeces: Yup.string().optional(),
  
  // Informations du demandeur
  motif: Yup.string().required("Le motif de la demande est obligatoire"),
  emailDemandeur: Yup.string().email("Email invalide").required("L'email est obligatoire"),
  telephoneDemandeur: Yup.string().required("Le téléphone est obligatoire"),
  
  // Optionnel
  citoyenId: Yup.number().integer().optional(),
});

export default function DecesFormPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  return (
    <div>
      <Hero
        title="Acte de décès"
        subtitle="Demande officielle en ligne"
        image="https://images.unsplash.com/photo-1541698444083-023c97d3f4b6?q=80&w=1600&auto=format&fit=crop"
      />
      <PageHeader title="Demande d'acte de décès" subtitle="Renseignez les informations du défunt et du décès" />

      {submitMessage && (
        <div className={`alert ${submitMessage.includes('succès') ? 'alert-success' : 'alert-error'} mx-4 md:mx-8 mb-4`}>
          {submitMessage}
        </div>
      )}

      <div className="card border border-base-300 bg-base-100 mx-4 md:mx-8 mb-12">
        <div className="card-body p-6">
          <Formik
            initialValues={{
              nomDefunt: "",
              prenomDefunt: "",
              dateNaissanceDefunt: "",
              dateDeces: "",
              lieuDeces: "",
              causeDeces: "",
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
                  typeActe: "deces",
                  citoyenId: values.citoyenId || null,
                  motif: values.motif,
                  emailDemandeur: values.emailDemandeur,
                  telephoneDemandeur: values.telephoneDemandeur,
                  statut: "en_cours",
                  donneesSupplementaires: {
                    // Informations du défunt
                    nomDefunt: values.nomDefunt,
                    prenomDefunt: values.prenomDefunt,
                    dateNaissanceDefunt: values.dateNaissanceDefunt,
                    dateDeces: values.dateDeces,
                    lieuDeces: values.lieuDeces,
                    causeDeces: values.causeDeces,
                  }
                };

                const result = await apiService.createDemande(demandeData);
                setSubmitMessage("Votre demande d'acte de décès a été soumise avec succès !");
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
                {/* Section défunt */}
                <section>
                  <h3 className="text-lg font-bold mb-4 text-primary">Informations du défunt</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormInput name="nomDefunt" label="Nom du défunt" />
                    <FormInput name="prenomDefunt" label="Prénom du défunt" />
                    <FormInput name="dateNaissanceDefunt" type="date" label="Date de naissance" />
                    <FormInput name="dateDeces" type="date" label="Date du décès" />
                    <FormInput name="lieuDeces" label="Lieu du décès" />
                    <FormInput name="causeDeces" label="Cause du décès (optionnel)" />
                  </div>
                </section>

                {/* Section demande */}
                <section>
                  <h3 className="text-lg font-bold mb-4 text-accent">Informations de la demande</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="label font-semibold">Motif de la demande</label>
                      <Field as="textarea" name="motif" className="textarea textarea-bordered w-full" 
                             placeholder="Expliquez pourquoi vous demandez cet acte de décès" />
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