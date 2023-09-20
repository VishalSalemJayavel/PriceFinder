import React from 'react'
import './singleProduct.css'
import products from '../../products'
import images from '../../constants/images'

const SingleProduct = () => {
  return (
    <div className="product">
      {products.map((product) => (
        <li key={product.id}>
          <div className='product__img'>
            <img src={images.tomato} className="card__image" alt='tomato' />
          </div>

          <div className='product__details'>
            <p className="card__titles">{product.title}</p>
            <p className="card__description">{product.description}</p>
            <p className="card__sellerName">{product.sellerName}</p>
            <p className="card__price">{product.price}</p>
            <p className="card__rating">{product.quantity}</p>
          </div>
        </li>
      ))}
    </div>
  )
}

export default SingleProduct