import React from 'react';
import { MainLayout } from '../../layout';
import { Link } from 'react-router-dom';

const Products = (props) => {
  return (
    <MainLayout>
      <div className="products">
        <Link to="/singleproduct">
          {/* <img src={images.tomato} className="card__image" alt={props.item.title} /> */}
          <p className="card__title">{props.item.title}</p>
          <p className="card__price">{props.item.price}</p>
        </Link>
    </div>
    </MainLayout>
  )
}

export default Products