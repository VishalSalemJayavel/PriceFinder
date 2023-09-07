import React from 'react'
import './login.css';
import {MainLayout} from '../../layout';


const LoginPage = () => {
  const [formData, setFormData] = React.useState(
    {userName: "", passWord: ""}
  )

  console.log(formData)

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
      <div>
        <form action="#" method="post">
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
