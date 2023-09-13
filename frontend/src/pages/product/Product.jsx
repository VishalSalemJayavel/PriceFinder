import React from 'react';
import './product.css';

import products from '../../products';
import { Products } from '../../components';
import { MainLayout } from '../../layout';
import { Link } from 'react-router-dom';

const Product = () => {
  const productCards = products.map((item) => {
    return (
      <Products 
        key={item.id}
        item={item}
      />
    )
  });

  return (
    <div className='app__product'>
      <div className='app__product-header'>
        <p>Products</p>
      </div>
      <div className='app__product-cards'>
        <Link to="/singleproduct">{productCards}</Link>
      </div>
    </div>
  )
}

export default Product