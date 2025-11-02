import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PageHeader from "../components/PageHeader";
import Hero from "../components/Hero";

const schema = Yup.object({
  enfantNom: Yup.string().required("Requis"),
  enfantPrenom: Yup.string().optional(),
  dateNaiss: Yup.date().required("Requis"),
  adoptantNom: Yup.string().required("Requis"),
  adoptantPrenom: Yup.string().optional(),
  motif: Yup.string().optional(),
  commune: Yup.string().optional(),
  contact: Yup.string().optional(),
});

export default function AdoptionFormPage() {
  return (
    <div>
      <Hero
        title="Acte d'adoption"
        subtitle="Démarches en ligne"
        image="https://images.unsplash.com/photo-1541698444083-023c97d3f4b6?q=80&w=1600&auto=format&fit=crop"
      />
      <PageHeader title="Demande d'acte d'adoption" subtitle="Renseignez les informations de l'enfant et de l'adoptant" />

      <div className="card border border-base-300 bg-base-100">
        <div className="card-body p-6">
          <Formik
            initialValues={{ enfantNom:"", enfantPrenom:"", dateNaiss:"", adoptantNom:"", adoptantPrenom:"", motif:"", commune:"", contact:"" }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              console.log("Adoption:", values);
              setSubmitting(false);
              resetForm();
              alert("Demande envoyée.");
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="label font-semibold">Nom de l'enfant</label>
                    <Field name="enfantNom" className="input input-bordered w-full" />
                    <ErrorMessage name="enfantNom" component="div" className="text-error text-sm mt-1" />
                  </div>
                  <div>
                    <label className="label font-semibold">Prénom de l'enfant</label>
                    <Field name="enfantPrenom" className="input input-bordered w-full" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="label font-semibold">Date de naissance</label>
                    <Field type="date" name="dateNaiss" className="input input-bordered w-full" />
                    <ErrorMessage name="dateNaiss" component="div" className="text-error text-sm mt-1" />
                  </div>
                  <div>
                    <label className="label font-semibold">Nom de l'adoptant</label>
                    <Field name="adoptantNom" className="input input-bordered w-full" />
                    <ErrorMessage name="adoptantNom" component="div" className="text-error text-sm mt-1" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Field name="adoptantPrenom" className="input input-bordered w-full" placeholder="Prénom de l'adoptant" />
                  <Field name="commune" className="input input-bordered w-full" placeholder="Commune" />
                </div>

                <Field as="textarea" name="motif" className="textarea textarea-bordered w-full" placeholder="Motif / remarques" />
                <Field name="contact" className="input input-bordered w-full" placeholder="Contact" />

                <div className="text-center pt-2">
                  <button type="submit" disabled={isSubmitting} className="btn btn-primary rounded-full w-full md:w-auto px-10">
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
