import React from 'react'
import './login.css';
import {MainLayout} from '../../layout';


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
      <div className='app__login-inputs'>
        <form onSubmit={loginFormSubmit} method="post">
          <input
            className="app__login-username"
            type="text"
            name="username"
            placeholder="username"
            onChange={handleChange}
          />
          <input
            className="app__login-password"
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
          />
          <input type="submit"/>
        </form>
      </div>
    </MainLayout>
  )
}

export default LoginPage
