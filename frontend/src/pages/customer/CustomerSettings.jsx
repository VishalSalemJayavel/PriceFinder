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

  function formCancel() {
    form.reset();
  }

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
        formData,
        { headers: { 'Content-Type': 'application/json'} },
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
          <div className='app__customerSettings-main'>
            <div className='app__customerSettings-title'>
              <p>Edit Profile</p>
            </div>
            <div className='app__customerSettings-inputs_one'>
              <input type="file"
                id="image"
                accept="image/png, image/jpeg"
                onChange={handleImageChange} required
              />
            </div>
          </div>

          <div className='app__customerSettings-inputs'>
            <label for="name">FullName</label>
            <input
              className="app__customerSettings-name"
              type="text"
              id='name'
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              value={customerData.name}
            />

            <div className='inputs__flex'>
              <div className='inputs-label'>
                <label For="addr1">Address Line 1</label>
                <input
                  className="app__customerSettings-address_line_1"
                  type="text"
                  id='addr1'
                  name="address_line_1"
                  placeholder="Address_line_1"
                  onChange={handleChange}
                  value={customerData.address_line_1}
                />
              </div>

              <div className='inputs-label'>
                <label htmlFor="addr2">Address Line 2</label>
                <input
                  className="app__customerSettings-address_line_2"
                  type="text"
                  id='addr2'
                  name="address_line_2"
                  placeholder="Address_line_2"
                  onChange={handleChange}
                  value={customerData.address_line_2}
                />
              </div>
            </div>

            <div className='inputs__flex'>
              <div className='inputs-label'>
                <label htmlFor="city">District</label>
                <input
                  className="app__customerSettings-city"
                  type="text"
                  name="city"
                  id='city'
                  placeholder="District"
                  onChange={handleChange}
                  value={customerData.city}
                />
              </div>

              <div className='inputs-label'>
                <label htmlFor="state">State</label>
                <input
                  className="app__customerSettings-state"
                  type="text"
                  id='state'
                  name="state"
                  placeholder="State"
                  onChange={handleChange}
                  value={customerData.state}
                />
              </div>
            </div>

            <label htmlFor="pincode">Pincode</label>
            <input
              className="app__customerSettings-pincode"
              type="text"
              id='pincode'
              name="pin_code"
              placeholder="Pin Code"
              onChange={handleChange}
              value={customerData.pin_code}
            />


            <div className='app__customerSettings-inputs_button'>
              <button type="submit" className='app__customerSettings-inputs_button' onClick={customerSettings}>Update Profile</button>
            </div>

            <div className='app__customerSettings-cancel_button'>
              <button type="button" className='app__customerSettings-cancel_button' onClick={formCancel}>Cancel</button>
            </div>
          </div>

        </form>
      </div>
    </MainLayout>
  )
}

export default CustomerSettings