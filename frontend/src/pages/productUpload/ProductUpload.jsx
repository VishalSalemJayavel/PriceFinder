import axios from 'axios';
import React, { useState } from 'react';
import { MainLayout } from '../../layout';
import './productUpload.css';

const ProductUpload = () => {
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    currency: "",
    stocks: "",
    unit: "",
  });

  const [productPicture, setProductPicture] = useState(null);

  const [userUpdateStatus, setUserUpdateStatus] = useState();

  const [isTitleValid, setIsTitleValid] = useState(true);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setProductData(prevFormData => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value
      }
    })

    switch (name) {
      case 'title':
        setIsTitleValid(value.length > 0);
        break;
      default:
        break;
    }
  }

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductPicture(reader.result);
      };
    }
  };


  const uploadProduct = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('title', productData.title);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('currency', productData.currency);
    formData.append('stocks', productData.stocks);
    formData.append('unit', productData.unit);
    formData.append('productPicture', productPicture);

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
      <div className='empty__div'>
      <div className='app__productupload'>
        {userUpdateStatus === true ? (
          <div className='app__customerSettings-success'>
            <p>Product Uploaded Successfully</p>
          </div>
        ) : userUpdateStatus === false ? (
          <div className='app__customerSettings-failure'>
            <p>Product Failed to Upload try again</p>
          </div>
        ) : null}
        <form onSubmit={uploadProduct} method="post">
          <div className='app__productupload-main'>
            <div className='app__productupload-title'>
              <p>Add your Product details</p>
            </div>

            <div className='app__productupload-inputs_one'>
              <input type="file"
                id="image"
                accept="image/png, image/jpeg"
                onChange={handleImageChange}
                required
              />
              {productPicture &&
                <img
                  src={productPicture}
                  alt="preview"
                  className='app__productupload-preview'
                />}
            </div>
          </div>

          <div className='app__productupload-inputs'>
            <label for="title">Product Name</label>
            <input
              className={`app__productupload-name ${isTitleValid ? '' : 'invalid'}`}
              type="text"
              id='title'
              name="title"
              placeholder="Enter your Product Name"
              onChange={handleChange}
              value={productData.title}
              required
            />
            {!isTitleValid && <p className='app__productupload-error'>Product Name cannot be empty</p>}

            <div className='inputs-label'>
              <label for="description">Product Description</label>
              <input
                className={`app__productupload-description`}
                type='text'
                id='description'
                name='description'
                placeholder='Enter your Product Description'
                onChange={handleChange}
                value={productData.description}
              />
            </div>

            <div className='inputs__flex'>
              <div className='inputs-label'>
                <label for="price">Price</label>
                <input
                  className="app__productupload-price"
                  type="number"
                  id='price'
                  name="price"
                  placeholder="Price"
                  onChange={handleChange}
                  value={productData.price}
                  required
                />
              </div>

              <div className='inputs-label'>
                <label for="currency">Currency</label>
                <input
                  className="app__productupload-currency"
                  type="text"
                  id='currency'
                  name="currency"
                  placeholder="Rupees"
                  value={productData.currency}
                  disabled
                />
              </div>
            </div>

            <div className='inputs__flex'>
              <div className='inputs-label'>
                <label for="stocks">Stocks</label>
                <input
                  className="app__productupload-stocks"
                  type="number"
                  name="stocks"
                  id='stocks'
                  placeholder="Enter your Stock amount"
                  onChange={handleChange}
                  value={productData.stocks}
                  required
                />
              </div>


              <div className='inputs-label'>
                <label for="unit">Unit</label>
                <select
                  className="app__productupload-unit"
                  id='unit'
                  name="unit"
                  value={productData.unit}
                  onChange={handleChange}
                  required
                >
                  <option value="L">L</option>
                  <option value="Kg">Kg</option>
                  <option value="Mg">Mg</option>
                </select>
              </div>
            </div>

            <div className='app__productupload-buttons'>
              <div className='app__productupload-inputs_button'>
                <button type="submit" className='app__productupload-inputs_button'>Upload Product</button>
              </div>

              <div className='app__productupload-cancel_button'>
                <button type="button" className='app__productupload-cancel_button'>Cancel</button>
              </div>
            </div>

          </div>
        </form>
      </div>
      </div>
    </MainLayout>
  )
}

export default ProductUpload