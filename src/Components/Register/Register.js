import React, { useState } from 'react'
import { Formik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  }
  return (
    <div className='flex-column' id='div'>
      <div className='card-register'>
        <div className='card-body'>
          <h4 className='title'>Register</h4>
          <Formik
            initialValues={{ userName: '', userDescription: '', email: '', password: '' }}
            validate={values => {
              const errors = {};
              if (values.userName === '') { errors.userName = 'Required !'; }
              if (values.userDescription === '') { errors.userDescription = 'Required !'; }
              if (!values.email) {
                errors.email = 'Required !';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) { errors.email = 'Invalid email address' }
              if (values.password === '') { errors.password = 'Required !'; }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await axios.post('http://localhost:4000/register', values)
                navigate('/login')
                setSubmitting(false);
              }
              catch (errors) { console.log(errors.response.data.message) }
            }}  >
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
                <div className='card-body'>
                  <label className='form-label text-light'>Name</label>
                  <input
                    type="text"
                    name="userName"
                    className='form-control'
                    placeholder='your name'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.userName}
                  />
                  <p className='text-danger'>  {errors.userName && touched.userName && errors.userName}</p>
                  <label className='form-label text-light'>Description</label>
                  <textarea
                    type="text"
                    name="userDescription"
                    className='form-control'
                    placeholder='your description'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.userDescription}
                  />
                  <p className='text-danger'>  {errors.userDescription && touched.userDescription && errors.userDescription}</p>
                  <label className='form-label text-light'>E-mail</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your e-mail"
                    className='form-control'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <p className='text-danger'> {errors.email && touched.email && errors.email}</p>
                  <label className='form-label text-light'>Password</label>
                  <div className='input-group'>
                    <input
                      className="form-control"
                      type={passwordShown ? "text" : "password"}
                      name="password"
                      placeholder='your password'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    <span className="input-group-text" onClick={togglePassword}></span>
                  </div>
                  <p className='text-danger'> {errors.password && touched.password && errors.password}</p>
                  <div className='my-2 d-flex justify-content-center text-white'>
                    <button type="submit" className='btn btn-success' disabled={isSubmitting}>Sign in</button>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
};
export default Register;