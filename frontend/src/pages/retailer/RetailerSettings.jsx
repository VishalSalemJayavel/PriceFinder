import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MainLayout } from '../../layout';
import './retailersettings.css';

const RetailerSettings = () => {
  const [retailerData, setRetailerData] = useState({
    name: "",
    email: "",
    phone_number: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
  });

  const [profilePicture, setProfilePicture] = useState(null);

  const [userUpdateStatus, setUserUpdateStatus] = useState();

  const [pageReloaded, setPageReloaded] = useState(false);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setRetailerData(prevFormData => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value
      }
    })
  }

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(file);
    }
  };

  useEffect(() => {
    // Check if the page was reloaded by comparing the current pathname
    // with the previous pathname stored in state.
    if (!pageReloaded) {
      // This block will only run on the initial page load or when the page is reloaded.
      const fetchRetailerData = async () => {
        try {
          const { data } = await axios.get('edituser/',
            { headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` } },
            { withCredentials: true });

          setRetailerData({
            name: data.name,
            email: data.email,
            phone_number: data.phone_number,
            address_line_1: data.address_line_1,
            address_line_2: data.address_line_2,
            city: data.city,
            district: data.district,
            state: data.state,
            pincode: data.pincode,
          });

          setProfilePicture(data.profilePicture);

        } catch (error) {
          console.error(error); // Handle error response
        }
      };

      fetchRetailerData();
    }

    // Set the pageReloaded state to true to prevent future runs
    setPageReloaded(true);
  }, [pageReloaded]);


  const retailerSettings = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('name', retailerData.name);
    formData.append('phone_number', retailerData.phone_number);
    formData.append('address_line_1', retailerData.address_line_1);
    formData.append('address_line_2', retailerData.address_line_2);
    formData.append('city', retailerData.city);
    formData.append('district', retailerData.district);
    formData.append('state', retailerData.state);
    formData.append('pincode', retailerData.pincode);
    formData.append('profilePicture', profilePicture);

    try {
      const response = await axios.post('edituser/',
        formData,
        { headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` } },
        { withCredentials: true });

      if (response.status === 200) {
        setUserUpdateStatus(true);
      }
      else {
        setUserUpdateStatus(false);
      }

    } catch (error) {
      console.error(error); // Handle error response
    }
  };


  return (
    <MainLayout>
      <div className='app__customerSettings'>
        {userUpdateStatus === true ? (
          <div className='app__customerSettings-success'>
            <p>Profile Updated Successfully</p>
          </div>
        ) : userUpdateStatus === false ? (
          <div className='app__customerSettings-failure'>
            <p>Profile Failed to Update</p>
          </div>
        ) : null}
        <form onSubmit={retailerSettings} method="post">
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
              value={retailerData.name}
              required
            />

            <div className='inputs__flex'>
              <div className='inputs-label'>
                <label for="email">Email</label>
                <input
                  className="app__customerSettings-email"
                  type="email"
                  id='email'
                  name="email"
                  placeholder="Email"
                  value={retailerData.email}
                  disabled
                />
              </div>

              <div className='inputs-label'>
                <label for="phone_number">Phone Number</label>
                <input
                  className='app__customerSettings-phonenum'
                  type='tel'
                  id='phone_number'
                  maxLength={10}
                  name='phone_number'
                  placeholder='Phone Number'
                  onChange={handleChange}
                  value={retailerData.phone_number}
                />
              </div>
            </div>

            <div className='inputs__flex'>
              <div className='inputs-label'>
                <label for="addr1">Address Line 1</label>
                <input
                  className="app__customerSettings-address_line_1"
                  type="text"
                  id='addr1'
                  name="address_line_1"
                  placeholder="Address_line_1"
                  onChange={handleChange}
                  value={retailerData.address_line_1}
                  required
                />
              </div>

              <div className='inputs-label'>
                <label for="addr2">Address Line 2</label>
                <input
                  className="app__customerSettings-address_line_2"
                  type="text"
                  id='addr2'
                  name="address_line_2"
                  placeholder="Address_line_2"
                  onChange={handleChange}
                  value={retailerData.address_line_2}
                />
              </div>
            </div>

            <div className='inputs__flex'>
              <div className='inputs-label'>
                <label for="city">City</label>
                <input
                  className="app__customerSettings-city"
                  type="text"
                  name="city"
                  id='city'
                  placeholder="city"
                  onChange={handleChange}
                  value={retailerData.city}
                  required
                />
              </div>

              <div className='inputs__flex'>
                <div className='inputs-label'>
                  <label for="district">District</label>
                  <input
                    className="app__customerSettings-district"
                    type="text"
                    name="district"
                    id="district"
                    placeholder="District"
                    onChange={handleChange}
                    value={retailerData.district}
                    required
                  />
                </div>

                <div className='inputs-label'>
                  <label for="state">State</label>
                  <input
                    className="app__customerSettings-state"
                    type="text"
                    id='state'
                    name="state"
                    placeholder="State"
                    onChange={handleChange}
                    value={retailerData.state}
                    required
                  />
                </div>
              </div>
            </div>

              <label for="pincode">Pincode</label>
              <input
                className="app__customerSettings-pincode"
                type="text"
                id='pincode'
                name="pincode"
                placeholder="Pin Code"
                onChange={handleChange}
                value={retailerData.pincode}
                required
              />

              <div className='app__customerSettings-buttons'>
                <div className='app__customerSettings-inputs_button'>
                  <button type="submit" className='app__customerSettings-inputs_button' onClick={retailerSettings}>Update Profile</button>
                </div>

                <div className='app__customerSettings-cancel_button'>
                  <button type="button" className='app__customerSettings-cancel_button'>Cancel</button>
                </div>
              </div>

            </div>

        </form>
      </div>
    </MainLayout>
  )
}

export default RetailerSettings