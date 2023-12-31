import axios from 'axios';
import React from 'react';
import { images } from '../../constants';
import { MainLayout } from '../../layout';
import './login.css';


const LoginPage = () => {
  const [formData, setFormData] = React.useState(
    { email: "", password: "" }
  );

  console.log(formData)

  const login = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('api/token/',
        formData, {
          headers:
            { 'Content-Type': 'application/json' }
      },
        { withCredentials: true });

      console.log(data); // Handle success response

      localStorage.clear();
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
      window.location.href = '/'

    } catch (error) {
      console.error(error); // Handle error response
    }
  };


  function handleChange(event) {
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    })
  }

  return (
    <MainLayout>

      <div className='app__login'>
        <div className='app__login-logo'>
          <img src={images.logo} alt="" />
        </div>
        <div className='app__login-inputs'>
          <div className='app__login-text'><p>Login</p></div>
          <form onSubmit={login} method="post">
            <div className='app__login-inputs_one'>
              <input
                className="app__login-email"
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                value={formData.userName}
              />
            </div>

            <div className='app__login-inputs_two'>
              <input
                className="app__login-password"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={formData.password}
              />
            </div>

            <div className='app__login-forgotpass'>
              <p><a href='#'>Forgot Password?</a></p>
            </div>

            <div className='app__login-inputs_button'>
              <button type="submit" className='app__login-inputs_button' onClick={login}>Login</button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  )
}

export default LoginPage
