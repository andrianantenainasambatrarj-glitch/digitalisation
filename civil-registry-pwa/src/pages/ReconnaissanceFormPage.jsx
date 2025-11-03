import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PageHeader from "../components/PageHeader";
import Hero from "../components/Hero";
import { apiService } from "../services/api";

const schema = Yup.object({
  // Informations de l'enfant
  nomEnfant: Yup.string().required("Le nom de l'enfant est obligatoire"),
  prenomEnfant: Yup.string().required("Le prénom de l'enfant est obligatoire"),
  dateNaissanceEnfant: Yup.date().required("La date de naissance de l'enfant est obligatoire"),
  
  // Informations du parent reconnaissant
  nomParent: Yup.string().required("Le nom du parent est obligatoire"),
  prenomParent: Yup.string().required("Le prénom du parent est obligatoire"),
  dateNaissanceParent: Yup.date().required("La date de naissance du parent est obligatoire"),
  
  // Informations de la reconnaissance
  dateReconnaissance: Yup.date().required("La date de reconnaissance est obligatoire"),
  typeReconnaissance: Yup.string().oneOf(['paternite', 'maternite'], 'Type invalide').required("Le type est obligatoire"),
  
  // Informations du demandeur
  motif: Yup.string().required("Le motif de la demande est obligatoire"),
  emailDemandeur: Yup.string().email("Email invalide").required("L'email est obligatoire"),
  telephoneDemandeur: Yup.string().required("Le téléphone est obligatoire"),
  
  // Optionnel
  citoyenId: Yup.number().integer().optional(),
});

export default function ReconnaissanceFormPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  return (
    <div>
      <Hero
        title="Acte de reconnaissance"
        subtitle="Demande officielle en ligne"
        image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop"
      />
      <PageHeader title="Demande d'acte de reconnaissance" subtitle="Renseignez les informations de l'enfant et du parent reconnaissant" />

      {submitMessage && (
        <div className={`alert ${submitMessage.includes('succès') ? 'alert-success' : 'alert-error'} mx-4 md:mx-8 mb-4`}>
          {submitMessage}
        </div>
      )}

      <div className="card border border-base-300 bg-base-100 mx-4 md:mx-8 mb-12">
        <div className="card-body p-6">
          <Formik
            initialValues={{
              nomEnfant: "",
              prenomEnfant: "",
              dateNaissanceEnfant: "",
              nomParent: "",
              prenomParent: "",
              dateNaissanceParent: "",
              dateReconnaissance: "",
              typeReconnaissance: "",
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
                  typeActe: "reconnaissance",
                  citoyenId: values.citoyenId || null,
                  motif: values.motif,
                  emailDemandeur: values.emailDemandeur,
                  telephoneDemandeur: values.telephoneDemandeur,
                  statut: "en_cours",
                  donneesSupplementaires: {
                    // Informations de l'enfant
                    nomEnfant: values.nomEnfant,
                    prenomEnfant: values.prenomEnfant,
                    dateNaissanceEnfant: values.dateNaissanceEnfant,
                    // Informations du parent reconnaissant
                    nomParent: values.nomParent,
                    prenomParent: values.prenomParent,
                    dateNaissanceParent: values.dateNaissanceParent,
                    // Informations de la reconnaissance
                    dateReconnaissance: values.dateReconnaissance,
                    typeReconnaissance: values.typeReconnaissance,
                  }
                };

                const result = await apiService.createDemande(demandeData);
                setSubmitMessage("Votre demande d'acte de reconnaissance a été soumise avec succès !");
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
                {/* Section enfant */}
                <section>
                  <h3 className="text-lg font-bold mb-4 text-primary">Informations de l'enfant</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <FormInput name="nomEnfant" label="Nom" />
                    <FormInput name="prenomEnfant" label="Prénom" />
                    <FormInput name="dateNaissanceEnfant" type="date" label="Date de naissance" />
                  </div>
                </section>

                {/* Section parent reconnaissant */}
                <section>
                  <h3 className="text-lg font-bold mb-4 text-secondary">Informations du parent reconnaissant</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <FormInput name="nomParent" label="Nom" />
                    <FormInput name="prenomParent" label="Prénom" />
                    <FormInput name="dateNaissanceParent" type="date" label="Date de naissance" />
                  </div>
                </section>

                {/* Section reconnaissance */}
                <section>
                  <h3 className="text-lg font-bold mb-4 text-accent">Informations de la reconnaissance</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormInput name="dateReconnaissance" type="date" label="Date de la reconnaissance" />
                    <div>
                      <label className="label font-semibold">Type de reconnaissance</label>
                      <Field as="select" name="typeReconnaissance" className="select select-bordered w-full">
                        <option value="">Sélectionner</option>
                        <option value="paternite">Paternité</option>
                        <option value="maternite">Maternité</option>
                      </Field>
                      <ErrorMessage name="typeReconnaissance" component="div" className="text-error text-sm mt-1" />
                    </div>
                  </div>
                </section>

                {/* Section demande */}
                <section>
                  <h3 className="text-lg font-bold mb-4 text-info">Informations de la demande</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="label font-semibold">Motif de la demande</label>
                      <Field as="textarea" name="motif" className="textarea textarea-bordered w-full" 
                             placeholder="Expliquez pourquoi vous demandez cet acte de reconnaissance" />
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