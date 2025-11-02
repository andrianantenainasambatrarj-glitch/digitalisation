import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PageHeader from "../components/PageHeader";
import Hero from "../components/Hero";

const schema = Yup.object({
  nomEpoux: Yup.string().required("Requis"),
  prenomEpoux: Yup.string().optional(),
  nomEpouse: Yup.string().required("Requis"),
  prenomEpouse: Yup.string().optional(),
  dateMariage: Yup.date().required("Requis"),
  lieuMariage: Yup.string().required("Requis"),
  regime: Yup.string().optional(),
  commune: Yup.string().optional(),
  contact: Yup.string().optional(),
});

export default function MariageFormPage() {
  return (
    <div>
      <Hero
        title="Acte de mariage"
        subtitle="Demande officielle en ligne"
        image="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1600&auto=format&fit=crop"
      />
      <PageHeader title="Demande d'acte de mariage" subtitle="Renseignez les informations du couple et de la célébration" />

      <div className="card border border-base-300 bg-base-100">
        <div className="card-body p-6">
          <Formik
            initialValues={{
              nomEpoux: "",
              prenomEpoux: "",
              nomEpouse: "",
              prenomEpouse: "",
              dateMariage: "",
              lieuMariage: "",
              regime: "",
              commune: "",
              contact: "",
            }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              console.log("Mariage:", values);
              setSubmitting(false);
              resetForm();
              alert("Demande envoyée.");
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="label font-semibold">Nom époux</label>
                    <Field name="nomEpoux" className="input input-bordered w-full" />
                    <ErrorMessage name="nomEpoux" component="div" className="text-error text-sm mt-1" />
                  </div>
                  <div>
                    <label className="label font-semibold">Prénom époux</label>
                    <Field name="prenomEpoux" className="input input-bordered w-full" />
                  </div>

                  <div>
                    <label className="label font-semibold">Nom épouse</label>
                    <Field name="nomEpouse" className="input input-bordered w-full" />
                    <ErrorMessage name="nomEpouse" component="div" className="text-error text-sm mt-1" />
                  </div>
                  <div>
                    <label className="label font-semibold">Prénom épouse</label>
                    <Field name="prenomEpouse" className="input input-bordered w-full" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="label font-semibold">Date du mariage</label>
                    <Field type="date" name="dateMariage" className="input input-bordered w-full" />
                    <ErrorMessage name="dateMariage" component="div" className="text-error text-sm mt-1" />
                  </div>
                  <div>
                    <label className="label font-semibold">Lieu du mariage</label>
                    <Field name="lieuMariage" className="input input-bordered w-full" />
                    <ErrorMessage name="lieuMariage" component="div" className="text-error text-sm mt-1" />
                  </div>
                </div>

                <Field name="regime" className="input input-bordered w-full" placeholder="Régime matrimonial (optionnel)" />

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
