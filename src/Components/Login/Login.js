import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';

function Login() {

  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  }
  return (
    <div className='flex-column'>
      <div id='div'>
        <div className='card-register'>
          <div className='card-body'>
            <h1 className='title'>Login</h1>
            <Formik
              initialValues={{ email: '', password: '' }}
              validate={values => {
                const errors = {}
                if (!values.email) {
                  errors.email = 'email is required !';
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) { errors.email = 'Invalid email address' }
                if (!values.password) { errors.password = 'password is required!' }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const response = await axios.post('http://localhost:4000/login', values)
                  navigate('/dashboard')
                  setSubmitting(false);
                }
                catch (errors) {
                  console.log(errors.response.data.message)
                }
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
                    <label className='form-label text-light'>E-mail</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="your e-mail"
                      className='form-control'
                      autoComplete='email'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    <p className='text-danger'> {errors.email && touched.email && errors.email}</p>
                    <label className='form-label text-light'>Password</label>
                    <div className='input-group'>
                      <input
                        type={passwordShown ? "text" : "password"}
                        name="password"
                        placeholder='your password'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        className='form-control' />
                      <span className="input-group-text" onClick={togglePassword}></span>
                    </div>
                    <p className='text-danger'> {errors.password && touched.password && errors.password}</p>
                    <Link to='/forgot-Password' className='mx-3 text-info'> Forgot Password ?</Link>
                    <div className='d-flex justify-content-between my-2'>
                      <button onClick={handleSubmit} className='btn btn-success text-white' type='button'>
                        Login
                      </button>
                      <Link className='btn btn-primary' to={`/register/`}>Cancel</Link>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div >
      </div >
    </div >
  )
};
export default Login