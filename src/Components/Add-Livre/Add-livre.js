import React from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
function Createlivre() {
  const navigate = useNavigate();
  return (
    <div className='card w-100'>
      <div className='card-header'>
        <h5>Create livre</h5>
      </div>
      <div className='card-body my-4'>
        <Formik
          initialValues={{ titre: '', auteur: '', description: '', contenue: '' }}
          validate={values => {
            const errors = {};
            if (!values.titre) { errors.titre = 'Required !'; }
            if (!values.auteur) { errors.auteur = 'Required !'; }
            if (!values.description) { errors.description = 'Required !'; }
            if (!values.contenue) { errors.contenue = 'Required !'; }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await axios.get('http://localhost:3000/getLivre'(values))
              navigate('/Bibliotheque')
              setSubmitting(false);
            }
            catch (errors) {
              console.log(errors.response.data.message)
            }
          }} >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <label className='form-label'>Titre</label>
              <input
                type="text"
                name="titre"
                className='form-control'
                placeholder="write the livre's name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.titre}
              />
              <p className='text-danger'>  {errors.titre && touched.titre && errors.titre}</p>
              <label className='form-label'>auteur</label>
              <textarea
                type="text"
                name="auteur"
                className='form-control'
                placeholder="write the livre's description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.auteur}
              ></textarea>
              <p className='text-danger'>  {errors.auteur && touched.auteur && errors.auteur}</p>
              <label className='form-label'> description</label>
              <textarea
                type="text"
                name="description"
                className='form-control'
                placeholder="write the livre's description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
              ></textarea>
              <p className='text-danger'>  {errors.description && touched.description && errors.description}</p>

              <label className='form-label'> contenue</label>
              <textarea
                type="text"
                name="contenue"
                className='form-control'
                placeholder="write the livre's description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.contenue}
              ></textarea>
              <p className='text-danger'>  {errors.contenue && touched.contenue && errors.contenue}</p>

              <div className='d-flex justify-content-between'>
                <button type="submit" className='btn btn-success text-white' disabled={isSubmitting}>Save</button>
                <Link className='btn btn-secondary' to={`/Bibliotheque`}>Cancel</Link>
              </div>
            </form>
          )
          }
        </Formik>
      </div>
    </div >
  )
};
export default Createlivre