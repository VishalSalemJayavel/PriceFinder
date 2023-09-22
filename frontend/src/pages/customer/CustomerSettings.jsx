import React, { useState } from 'react';
import './customerSettings.css';
import axios from 'axios';
import { MainLayout } from '../../layout';

const CustomerSettings = () => {
  const [customerData, setCustomerData] = useState({
    name: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    zip_code: "",
    image: null,
  });

  const customerSettings = async (e) => { };

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setCustomerData(prevFormData => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value
      }
    })
  }

  return (
    <MainLayout>
      <div className='app__customerSettings'>
        <form onSubmit={customerSettings} method="post">
          <div className='app__customerSettings-inputs_one'>
            <input
              className="app__customerSettings-fullname"
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              value={customerData.name}
            />
          </div>
        </form>
      </div>
    </MainLayout>
  )
}

export default CustomerSettings