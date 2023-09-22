import React from 'react'
import './signUp.css';
import axios from 'axios';
import { MainLayout } from '../../layout';
import { images } from '../../constants';

function SignUp() {
  const [formData, setFormData] = React.useState(
    {
      name: "",
      password: "",
      email: "",
      phone_number: "",
      user_type: ""
    }
  )

  console.log(formData)

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('createuser/',
        formData, {
        headers:
          { 'Content-Type': 'application/json' }
      },
        { withCredentials: true });

      console.log(response); // Handle success response

      window.location.href = '/login'

    } catch (error) {
      console.error(error); // Handle error response
    }
  };

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value
      }
    })
  }

  return (
    <MainLayout>
      <div className='app__signup'>
        <div className='app__signup-logo'>
          <img src={images.logo} alt="" />
        </div>
        <div className='app__signup-inputs'>
          <div className='app__signup-text'><p>Sign Up</p></div>

          <form onSubmit={signUp} method="post">
            <div className='app__signup-inputs_one'>
              <input
                className="app__signup-fullname"
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                value={formData.name}
              />
            </div>

            <div className='app__signup-inputs_two'>
              <input
                className="app__signup-email"
                type="email"
                name="email"
                placeholder="Enter your Email"
                onChange={handleChange}
                value={formData.email}
              />
            </div>

            <div className='app__signup-inputs_three'>
              <input
                className="app__signup-password"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={formData.password}
              />
            </div>

            <div className='app__signup-inputs_four'>
              <input
                className='app__signup-phonenum'
                type='tel'
                maxLength={10}
                name='phone_number'
                placeholder='Phone Number'
                onChange={handleChange}
                value={formData.phone_number}
              />
            </div>

            <div className='app__signup-inputs_five'>
            <p>Select who you are</p>
              <div className='app__signup-inputs_five-options'>
                
                <div>
                <input
                className='app__signup-producer'
                  type="radio"
                  id="retailer"
                  name="user_type"
                  value="retailer"
                  checked={formData.user_type === "retailer"}
                  onChange={handleChange} />Seller

                <input
                  type="radio"
                  id="customer"
                  name="user_type"
                  value="customer"
                  checked={formData.user_type === "customer"}
                  onChange={handleChange} />Buyer
                </div>
              </div>
            </div>

            <div className='app__signup-inputs_button'>
              <button type="submit" className='app__signup-inputs_button' onClick={signUp}>Sign Up</button>
            </div>
          </form>
        </div>
      </div>

    </MainLayout>
  )
}

export default SignUp