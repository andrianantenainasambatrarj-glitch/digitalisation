import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Hero from '../components/Hero';
import { agentApi } from '../services/agentApi';

const schema = Yup.object({
  email: Yup.string().email('Email invalide').required('Email requis'),
  password: Yup.string().required('Mot de passe requis'),
});

export default function AgentLoginPage() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-200">
      <Hero
        title="Espace Agent"
        subtitle="Connexion à votre tableau de bord"
        image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1600&auto=format&fit=crop"
      />

      <div className="container mx-auto px-4 py-8 max-w-md">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center">Connexion Agent</h2>

            {error && (
              <div className="alert alert-error">
                {error}
              </div>
            )}

            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={schema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  setError('');
                  const result = await agentApi.login(values);
                  
                  // Stocker le token
                  localStorage.setItem('agent_token', result.token);
                  
                  // Rediriger vers le dashboard
                  navigate('/agent/dashboard');
                } catch (err) {
                  setError(err.message);
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div>
                    <label className="label font-semibold">Email</label>
                    <Field
                      name="email"
                      type="email"
                      className="input input-bordered w-full"
                      placeholder="votre.email@commune.fr"
                    />
                    <ErrorMessage name="email" component="div" className="text-error text-sm mt-1" />
                  </div>

                  <div>
                    <label className="label font-semibold">Mot de passe</label>
                    <Field
                      name="password"
                      type="password"
                      className="input input-bordered w-full"
                      placeholder="Votre mot de passe"
                    />
                    <ErrorMessage name="password" component="div" className="text-error text-sm mt-1" />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-full"
                  >
                    {isSubmitting ? 'Connexion...' : 'Se connecter'}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}