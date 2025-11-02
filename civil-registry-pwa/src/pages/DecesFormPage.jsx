import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PageHeader from "../components/PageHeader";
import Hero from "../components/Hero";

const schema = Yup.object({
  nom: Yup.string().required("Requis"),
  prenom: Yup.string().optional(),
  dateDeces: Yup.date().required("Requis"),
  lieuDeces: Yup.string().required("Requis"),
  cause: Yup.string().optional(),
  declarant: Yup.string().optional(),
  contact: Yup.string().optional(),
});

export default function DecesFormPage() {
  return (
    <div>
      <Hero
        title="Déclaration de décès"
        subtitle="Procédure d'enregistrement en ligne"
        image="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop"
      />
      <PageHeader title="Déclaration de décès" subtitle="Renseignez les informations nécessaires" />

      <div className="card border border-base-300 bg-base-100">
        <div className="card-body p-6">
          <Formik
            initialValues={{ nom: "", prenom: "", dateDeces: "", lieuDeces: "", cause: "", declarant: "", contact: "" }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              console.log("Décès:", values);
              setSubmitting(false);
              resetForm();
              alert("Déclaration envoyée.");
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
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="label font-semibold">Date du décès</label>
                    <Field type="date" name="dateDeces" className="input input-bordered w-full" />
                    <ErrorMessage name="dateDeces" component="div" className="text-error text-sm mt-1" />
                  </div>
                  <div>
                    <label className="label font-semibold">Lieu du décès</label>
                    <Field name="lieuDeces" className="input input-bordered w-full" />
                    <ErrorMessage name="lieuDeces" component="div" className="text-error text-sm mt-1" />
                  </div>
                </div>

                <Field name="cause" className="input input-bordered w-full" placeholder="Cause (si connue)" />
                <Field name="declarant" className="input input-bordered w-full" placeholder="Nom du déclarant" />
                <Field name="contact" className="input input-bordered w-full" placeholder="Contact" />

                <div className="text-center pt-2">
                  <button type="submit" disabled={isSubmitting} className="btn btn-primary rounded-full w-full md:w-auto px-10">
                    {isSubmitting ? "Envoi..." : "Soumettre la déclaration"}
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
