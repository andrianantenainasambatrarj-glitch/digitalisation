import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PageHeader from "../components/PageHeader";
import Hero from "../components/Hero";

const schema = Yup.object({
  nomReq: Yup.string().required("Requis"),
  prenomReq: Yup.string().optional(),
  nomPart: Yup.string().required("Requis"),
  prenomPart: Yup.string().optional(),
  dateProc: Yup.date().required("Requis"),
  motif: Yup.string().optional(),
  contact: Yup.string().optional(),
});

export default function DivorceFormPage() {
  return (
    <div>
      <Hero
        title="Acte de divorce"
        subtitle="Demande officielle en ligne"
        image="https://images.unsplash.com/photo-1488998527040-85054a85150e?q=80&w=1600&auto=format&fit=crop"
      />
      <PageHeader title="Demande d'acte de divorce" subtitle="Renseignez les informations des parties et de la procédure" />

      <div className="card border border-base-300 bg-base-100">
        <div className="card-body p-6">
          <Formik
            initialValues={{ nomReq: "", prenomReq: "", nomPart: "", prenomPart: "", dateProc: "", motif: "", contact: "" }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              console.log("Divorce:", values);
              setSubmitting(false);
              resetForm();
              alert("Demande envoyée.");
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="label font-semibold">Nom du requérant</label>
                    <Field name="nomReq" className="input input-bordered w-full" />
                    <ErrorMessage name="nomReq" component="div" className="text-error text-sm mt-1" />
                  </div>
                  <div>
                    <label className="label font-semibold">Prénom du requérant</label>
                    <Field name="prenomReq" className="input input-bordered w-full" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="label font-semibold">Nom de la partie</label>
                    <Field name="nomPart" className="input input-bordered w-full" />
                    <ErrorMessage name="nomPart" component="div" className="text-error text-sm mt-1" />
                  </div>
                  <div>
                    <label className="label font-semibold">Prénom de la partie</label>
                    <Field name="prenomPart" className="input input-bordered w-full" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="label font-semibold">Date de la procédure</label>
                    <Field type="date" name="dateProc" className="input input-bordered w-full" />
                    <ErrorMessage name="dateProc" component="div" className="text-error text-sm mt-1" />
                  </div>
                  <Field name="contact" className="input input-bordered w-full" placeholder="Contact" />
                </div>

                <Field as="textarea" name="motif" className="textarea textarea-bordered w-full" placeholder="Remarques / motif" />

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
