import React from 'react'
import './signUp.css';
import axios from 'axios';
import {MainLayout} from '../../layout';
import {images} from '../../constants';

function SignUp() {
    const [formData, setFormData] = React.useState(
        {name: "",
         password: "",
         email: "",
         phone_number: "",
        }
    )

    console.log(formData)

    // function signupFormSubmit() {
    //     const requestOptions = {
    //       method: 'POST',
    //       headers: {'Content-Type': 'application/json'},
    //       body: JSON.stringify(formData)
    //   };
    //   fetch('http://localhost:8000/dummyresponse', requestOptions)
    //       .then(response => response.json())
    //       .then(data => console.log(data));
    // }

    const signUp = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.get('api/createuser', formData);
        console.log(response.data); // Handle success response
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