import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { apiService } from '../services/api';
import { useOffline } from '../hooks/useOffline';

const demandeSchemas = {
  naissance: Yup.object({
    nomEnfant: Yup.string().required('Nom requis'),
    prenomEnfant: Yup.string().required('Prénom requis'),
    sexeEnfant: Yup.string().oneOf(['M', 'F']).required('Sexe requis'),
    dateNaissance: Yup.date().required('Date requise'),
    lieuNaissance: Yup.string().required('Lieu requis'),
    nomPere: Yup.string().required('Nom du père requis'),
    prenomPere: Yup.string().required('Prénom du père requis'),
    nomMere: Yup.string().required('Nom de la mère requis'),
    prenomMere: Yup.string().required('Prénom de la mère requis'),
  }),
  
  mariage: Yup.object({
    nomEpoux: Yup.string().required('Nom époux requis'),
    prenomEpoux: Yup.string().required('Prénom époux requis'),
    nomEpouse: Yup.string().required('Nom épouse requis'),
    prenomEpouse: Yup.string().required('Prénom épouse requis'),
    dateMariage: Yup.date().required('Date requise'),
    lieuMariage: Yup.string().required('Lieu requis'),
  })
};

export default function DemandeForm({ typeActe, onSuccess, onError }) {
  const [resultat, setResultat] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isOnline } = useOffline();

  const handleSubmit = async (values) => {
    setLoading(true);
    setResultat(null);

    try {
      const result = await apiService.soumettreDemande(typeActe, values);
      setResultat(result);
      
      if (result.valide) {
        onSuccess?.(result);
      } else {
        onError?.(result.message);
      }
    } catch (error) {
      onError?.(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getFieldsForType = (type) => {
    switch (type) {
      case 'naissance':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informations de l'enfant</h3>
            <div className="grid grid-cols-2 gap-4">
              <FormField name="nomEnfant" label="Nom" />
              <FormField name="prenomEnfant" label="Prénom" />
            </div>
            <FormField name="sexeEnfant" label="Sexe" type="select" options={[
              {value: 'M', label: 'Masculin'},
              {value: 'F', label: 'Féminin'}
            ]} />
            <FormField name="dateNaissance" label="Date de naissance" type="date" />
            <FormField name="lieuNaissance" label="Lieu de naissance" />

            <h3 className="text-lg font-semibold mt-6">Informations des parents</h3>
            <div className="grid grid-cols-2 gap-4">
              <FormField name="nomPere" label="Nom du père" />
              <FormField name="prenomPere" label="Prénom du père" />
              <FormField name="nomMere" label="Nom de la mère" />
              <FormField name="prenomMere" label="Prénom de la mère" />
            </div>
          </div>
        );
      
      case 'mariage':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informations de l'époux</h3>
            <div className="grid grid-cols-2 gap-4">
              <FormField name="nomEpoux" label="Nom" />
              <FormField name="prenomEpoux" label="Prénom" />
            </div>

            <h3 className="text-lg font-semibold mt-6">Informations de l'épouse</h3>
            <div className="grid grid-cols-2 gap-4">
              <FormField name="nomEpouse" label="Nom" />
              <FormField name="prenomEpouse" label="Prénom" />
            </div>

            <h3 className="text-lg font-semibold mt-6">Informations du mariage</h3>
            <FormField name="dateMariage" label="Date du mariage" type="date" />
            <FormField name="lieuMariage" label="Lieu du mariage" />
          </div>
        );
      
      default:
        return <div>Type d'acte non supporté</div>;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Indicateur de connexion */}
      <div className={`alert ${isOnline ? 'alert-success' : 'alert-warning'} mb-6`}>
        <div>
          <span>{isOnline ? '🟢 Connecté' : '🟡 Hors ligne - Mode dégradé'}</span>
        </div>
      </div>

      <Formik
        initialValues={getInitialValuesForType(typeActe)}
        validationSchema={demandeSchemas[typeActe]}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title capitalize">
                  Demande d'acte de {typeActe}
                </h2>

                {getFieldsForType(typeActe)}

                <div className="card-actions justify-end mt-6">
                  <button 
                    type="submit" 
                    className={`btn btn-primary ${loading ? 'loading' : ''}`}
                    disabled={loading || isSubmitting}
                  >
                    {loading ? 'Vérification...' : 'Soumettre la demande'}
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      {/* Résultat de la vérification */}
      {resultat && (
        <div className={`alert mt-6 ${resultat.valide ? 'alert-success' : 'alert-error'}`}>
          <div>
            <h3 className="font-bold">
              {resultat.valide ? '✅ Demande validée' : '❌ Demande rejetée'}
            </h3>
            <p>{resultat.message}</p>
            {resultat.status === 'impression_en_cours' && (
              <p className="text-sm mt-2">📄 Impression automatique en cours...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const FormField = ({ name, label, type = 'text', options }) => (
  <div>
    <label className="label font-semibold">{label}</label>
    {type === 'select' ? (
      <Field as="select" name={name} className="select select-bordered w-full">
        <option value="">Sélectionner</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </Field>
    ) : (
      <Field name={name} type={type} className="input input-bordered w-full" />
    )}
    <ErrorMessage name={name} component="div" className="text-error text-sm mt-1" />
  </div>
);

const getInitialValuesForType = (type) => {
  switch (type) {
    case 'naissance':
      return {
        nomEnfant: '', prenomEnfant: '', sexeEnfant: '', dateNaissance: '', lieuNaissance: '',
        nomPere: '', prenomPere: '', nomMere: '', prenomMere: ''
      };
    case 'mariage':
      return {
        nomEpoux: '', prenomEpoux: '', nomEpouse: '', prenomEpouse: '',
        dateMariage: '', lieuMariage: ''
      };
    default:
      return {};
  }
};