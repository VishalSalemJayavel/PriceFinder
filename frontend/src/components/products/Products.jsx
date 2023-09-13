import React from 'react'
import { MainLayout } from '../../layout'

const Products = (props) => {
  return (
    <div className="products">
        {/* <img src={images.tomato} className="card__image" alt={props.item.title} /> */}
        <p className="card__title">{props.item.title}</p>
        <p className="card__price">{props.item.price}</p>
    </div>
  )
}

export default Products