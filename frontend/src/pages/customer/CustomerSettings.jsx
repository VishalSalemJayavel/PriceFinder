import React, { useState } from 'react';
import './customersettings.css';
import axios from 'axios';
import { MainLayout } from '../../layout';

const CustomerSettings = () => {
  const [customerData, setCustomerData] = useState({
    name: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    pin_code: "",
    country: ""
  });

  const [profilePicture, setProfilePicture] = useState({
    image: null
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setCustomerData(prevFormData => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value
      }
    })
  }

  function handleImageChange(event) {
    setProfilePicture({ image: event.target.files[0] })
  };

  const customerSettings = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('name', customerData.name);
    formData.append('address_line_1', customerData.address_line_1);
    formData.append('address_line_2', customerData.address_line_2);
    formData.append('city', customerData.city);
    formData.append('state', customerData.state);
    formData.append('pin_code', customerData.pin_code);
    formData.append('country', customerData.country);
    formData.append('profilePicture', profilePicture.image);

    try {
      const response = await axios.post('edituser/',
        formData, {
        headers:
          { 'Content-Type': 'multipart/form-data' }
      },
        { withCredentials: true });

      console.log(response); // Handle success response

    } catch (error) {
      console.error(error); // Handle error response
    }
  };


  return (
    <MainLayout>
      <div className='app__customerSettings'>
        <form onSubmit={customerSettings} method="post">
          <div className='app__customerSettings-inputs_one'>
            <input type="file"
              id="image"
              accept="image/png, image/jpeg"
              onChange={handleImageChange} required
            />

            <input
              className="app__customerSettings-name"
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              value={customerData.name}
            />

            <input
              className="app__customerSettings-address_line_1"
              type="text"
              name="address_line_1"
              placeholder="Address_line_1"
              onChange={handleChange}
              value={customerData.address_line_1}
            />

            <input
              className="app__customerSettings-address_line_2"
              type="text"
              name="address_line_2"
              placeholder="Address_line_2"
              onChange={handleChange}
              value={customerData.address_line_2}
            />

            <input
              className="app__customerSettings-city"
              type="text"
              name="city"
              placeholder="City"
              onChange={handleChange}
              value={customerData.city}
            />

            <input
              className="app__customerSettings-state"
              type="text"
              name="state"
              placeholder="State"
              onChange={handleChange}
              value={customerData.state}
            />

            <input
              className="app__customerSettings-pincode"
              type="text"
              name="pin_code"
              placeholder="Pin Code"
              onChange={handleChange}
              value={customerData.pin_code}
            />

            <input
              className="app__customerSettings-country"
              type="text"
              name="country"
              placeholder="Country"
              onChange={handleChange}
              value={customerData.country}
            />

            <div className='app__customerSettings-inputs_button'>
              <button type="submit" className='app__customerSettings-inputs_button' onClick={customerSettings}>Update Profile</button>
            </div>

          </div>
        </form>
      </div>
    </MainLayout>
  )
}

export default CustomerSettings