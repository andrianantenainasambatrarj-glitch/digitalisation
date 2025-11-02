import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PageHeader from "../components/PageHeader";
import Hero from "../components/Hero";

const schema = Yup.object({
  nomEnfant: Yup.string().required("Requis"),
  prenomEnfant: Yup.string().optional(),
  dateNaiss: Yup.date().required("Requis"),
  nomReconnaissant: Yup.string().required("Requis"),
  lien: Yup.string().optional(),
  commune: Yup.string().optional(),
  contact: Yup.string().optional(),
});

export default function ReconnaissanceFormPage() {
  return (
    <div>
      <Hero
        title="Acte de reconnaissance"
        subtitle="Procédure en ligne"
        image="https://images.unsplash.com/photo-1519836715922-954d64fa2d4e?q=80&w=1600&auto=format&fit=crop"
      />
      <PageHeader title="Demande d'acte de reconnaissance" subtitle="Renseignez les informations de l'enfant et du reconnaissant" />

      <div className="card border border-base-300 bg-base-100">
        <div className="card-body p-6">
          <Formik
            initialValues={{ nomEnfant: "", prenomEnfant: "", dateNaiss: "", nomReconnaissant: "", lien: "", commune: "", contact: "" }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              console.log("Reconnaissance:", values);
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
                    <Field name="nomEnfant" className="input input-bordered w-full" />
                    <ErrorMessage name="nomEnfant" component="div" className="text-error text-sm mt-1" />
                  </div>
                  <div>
                    <label className="label font-semibold">Prénom de l'enfant</label>
                    <Field name="prenomEnfant" className="input input-bordered w-full" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="label font-semibold">Date de naissance</label>
                    <Field type="date" name="dateNaiss" className="input input-bordered w-full" />
                    <ErrorMessage name="dateNaiss" component="div" className="text-error text-sm mt-1" />
                  </div>
                  <div>
                    <label className="label font-semibold">Nom du reconnaissant</label>
                    <Field name="nomReconnaissant" className="input input-bordered w-full" />
                    <ErrorMessage name="nomReconnaissant" component="div" className="text-error text-sm mt-1" />
                  </div>
                </div>

                <Field name="lien" className="input input-bordered w-full" placeholder="Lien (père/mère/autre)" />

                <div className="grid md:grid-cols-2 gap-6">
                  <Field name="commune" className="input input-bordered w-full" placeholder="Commune" />
                  <Field name="contact" className="input input-bordered w-full" placeholder="Contact" />
                </div>

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
