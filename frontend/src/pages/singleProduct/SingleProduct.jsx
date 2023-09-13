import React from 'react'
import './singleProduct.css'
import products from '../../products'

const SingleProduct = () => {
  return (
    <div className="products">
      {products.map((product) => (
        <li key={product.id}>
          {/* <img src={images.tomato} className="card__image" alt={props.item.title} /> */}
          <p className="card__title">{product.title}</p>
          <p className="card__description">{product.description}</p>
          <p className="card__sellerName">{product.sellerName}</p>
          <p className="card__price">{product.price}</p>
          <p className="card__rating">{product.quantity}</p>
        </li>
      ))} 
    </div>
  )
}

export default SingleProduct