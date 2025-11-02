import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PageHeader from "../components/PageHeader";
import Hero from "../components/Hero";

const schema = Yup.object({
  nom: Yup.string().required("Requis"),
  prenom: Yup.string().required("Requis"),
  dateNaissance: Yup.date().required("Requis"),
  lieuNaissance: Yup.string().optional(),
  motif: Yup.string().optional(),
  commune: Yup.string().optional(),
  contact: Yup.string().optional(),
});

export default function BulletinNaissancePage() {
  return (
    <div>
      <Hero
        title="Bulletin de naissance"
        subtitle="Demande administrative en ligne"
        image="https://images.unsplash.com/photo-1574250606263-3e03f7bcff68?q=80&w=1600&auto=format&fit=crop"
      />
      <PageHeader title="Demande de bulletin de naissance" subtitle="Renseignez les informations d'état civil" />

      <div className="card border border-base-300 bg-base-100">
        <div className="card-body p-6">
          <Formik
            initialValues={{ nom: "", prenom: "", dateNaissance: "", lieuNaissance: "", motif: "", commune: "", contact: "" }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              console.log("Bulletin:", values);
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
                    <Field type="date" name="dateNaissance" className="input input-bordered w-full" />
                    <ErrorMessage name="dateNaissance" component="div" className="text-error text-sm mt-1" />
                  </div>
                  <Field name="lieuNaissance" className="input input-bordered w-full" placeholder="Lieu de naissance" />
                </div>

                <Field as="textarea" name="motif" className="textarea textarea-bordered w-full" placeholder="Motif (ex: scolaire, passeport)" />

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
