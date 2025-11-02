import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PageHeader from "../components/PageHeader";
import Hero from "../components/Hero";

const schema = Yup.object({
  nom: Yup.string().required("Requis"),
  prenom: Yup.string().required("Requis"),
  dateNaiss: Yup.date().required("Requis"),
  lieu: Yup.string().optional(),
  commune: Yup.string().optional(),
  contact: Yup.string().optional(),
});

export default function CertificatCelibatPage() {
  return (
    <div>
      <Hero
        title="Certificat de célibat"
        subtitle="Demande officielle en ligne"
        image="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1600&auto=format&fit=crop"
      />
      <PageHeader title="Demande de certificat de célibat" subtitle="Renseignez vos informations personnelles" />

      <div className="card border border-base-300 bg-base-100">
        <div className="card-body p-6">
          <Formik
            initialValues={{ nom: "", prenom: "", dateNaiss: "", lieu: "", commune: "", contact: "" }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              console.log("Célibat:", values);
              setSubmitting(false);
              resetForm();
              alert("Demande envoyée.");
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="label font-semibold">Nom</label>
                    <Field name="nom" className="input input-bordered w-full" />
                    <ErrorMessage name="nom" component="div" className="text-error text-sm mt-1" />
                  </div>
                  <div>
                    <label className="label font-semibold">Prénom</label>
                    <Field name="prenom" className="input input-bordered w-full" />
                    <ErrorMessage name="prenom" component="div" className="text-error text-sm mt-1" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="label font-semibold">Date de naissance</label>
                    <Field type="date" name="dateNaiss" className="input input-bordered w-full" />
                    <ErrorMessage name="dateNaiss" component="div" className="text-error text-sm mt-1" />
                  </div>
                  <Field name="lieu" className="input input-bordered w-full" placeholder="Lieu de naissance" />
                </div>

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
