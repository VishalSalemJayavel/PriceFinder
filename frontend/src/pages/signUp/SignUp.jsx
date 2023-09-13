import React from 'react'
import './signUp.css';
import axios from 'axios';
import {MainLayout} from '../../layout';
import {images} from '../../constants';

function SignUp() {
    const [formData, setFormData] = React.useState(
        {userName: "",
         passWord: "",
         email: "",
         address_line1: "",
         address_line2: "",
         city: "",
         state: "",
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

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.get('http://localhost:8000/api/customers', formData);
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

            <form onSubmit={handleSubmit} method="post">
             <div className='app__signup-inputs_one'> 
              <input
                className="app__signup-fullname"
                type="text"
                name="Fullname"
                placeholder="Full Name"
                onChange={handleChange}
                value={formData.userName}
              />
              </div>
    
              <div className='app__signup-inputs_two'>
              <input
                className="app__signup-password"
                type="password"
                name="passWord"
                placeholder="Password"
                onChange={handleChange}
                value={formData.passWord}
              />
              </div>

              <div className='app__signup-inputs_three'>
              <input
                className="app__signup-email"
                type="email"
                name="email"
                placeholder="Enter your Email"
                onChange={handleChange}
                value={formData.email}
              />
              </div>

              {/* <div className='app__signup-inputs_four'>
              <input
                className="app__signup-address_line1"
                type="text"
                name="address_line1"
                placeholder="Address Line 1"
                onChange={handleChange}
                value={formData.address_line1}
              />
              </div> */}

              {/* <div className='app__signup-inputs_five'>
              <input
                className="app__signup-address_line2"
                type="text"
                name="address_line2"
                placeholder="Address Line 2"
                onChange={handleChange}
                value={formData.address_line2}
              />
              </div> */}

              {/* <div className='app__signup-inputs_six'>
              <input
                className="app__signup-city"
                type="text"
                name="city"
                placeholder="City"
                onChange={handleChange}
                value={formData.city}
              />
              </div> */}

              {/* <div className='app__signup-inputs_seven'>
              <input
                className="app__signup-state"
                type="text"
                name="state"
                placeholder="State"
                onChange={handleChange}
                value={formData.state}
              />
              </div> */}
    
              <div className='app__signup-inputs_button'>
              <button type="submit" className='app__signup-inputs_button' onClick={handleSubmit}>Sign Up</button>
              </div>
            </form>
          </div>
        </div>
    
        </MainLayout>
    )
}

export default SignUp