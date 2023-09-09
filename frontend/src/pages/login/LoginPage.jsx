import React from 'react'
import './login.css';
import {MainLayout} from '../../layout';
import {images} from '../../constants';


const LoginPage = () => {
  const [formData, setFormData] = React.useState(
    {userName: "", passWord: ""}
  )

  console.log(formData)

  function loginFormSubmit() {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData)
  };
  fetch('http://localhost:8000/dummyresponse', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));
  }

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
        <form onSubmit={loginFormSubmit} method="post">
         <div className='app__login-inputs_one'> 
          <input
            className="app__login-username"
            type="text"
            name="userName"
            placeholder="User Name"
            onChange={handleChange}
            value={formData.userName}
          />
          </div>

          <div className='app__login-inputs_two'>
          <input
            className="app__login-password"
            type="password"
            name="passWord"
            placeholder="Password"
            onChange={handleChange}
            value={formData.passWord}
          />
          </div>

          <div className='app__login-forgotpass'>
            <p><a href='#'>Forgot Password?</a></p>  
          </div>

          <div className='app__login-inputs_button'>
          <input type="submit"/>
          </div>
        </form>
      </div>
    </div>

    </MainLayout>
  )
}

export default LoginPage
