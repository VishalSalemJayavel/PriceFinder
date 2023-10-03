import React from 'react';
import './product.css';
import { Products } from '../../components';


const Product = () => {

  return (
    <div className='empty__div'>
      <div className='app__product-header'>
        <p>Products</p>
      </div>
      <div className='app__product-cards'>
        <Products />
      </div>
    </div>
  )
}

export default Product