import React from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
function CreateCategory() {
  const navigate = useNavigate();
  return (
    <div className='card w-100'>
      <div className='card-header'>
        <h5>Create category</h5>
      </div>
      <div className='card-body my-4'>
        <Formik
          initialValues={{ nomdecategie: '', listedesLivres: '' }}
          validate={values => {
            const errors = {};
            if (!values.nomdecategie) { errors.nomdecategie = 'Required !'; }
            if (!values.listedesLivres) { errors.listedesLivres = 'Required !'; }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await axios.get('http://localhost:3000/getCategory'(values))
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
              <label className='form-label'>Nom</label>
              <input
                type="text"
                name="nomdecategie"
                className='form-control'
                placeholder="write the Category's name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.nomdecategie}
              />
              <p className='text-danger'>  {errors.nomdecategie && touched.nomdecategie && errors.nomdecategie}</p>
              <label className='form-label'>Listes des livres</label>
              <textarea
                type="text"
                name="nomdecategie"
                className='form-control'
                placeholder="write the Category's description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.listedesLivres}
              ></textarea>
              <p className='text-danger'>  {errors.listedesLivres && touched.listedesLivres && errors.listedesLivres}</p>
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
export default CreateCategory