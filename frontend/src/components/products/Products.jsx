import React from 'react';
import { MainLayout } from '../../layout';
import { Link } from 'react-router-dom';
import {images} from '../../constants';
import './products.css';

const Products = (props) => {
  return (
        <MainLayout>
      <div className="products">
        <Link to="/singleproduct" className='products__container'>

          <div className="card__images">
            <img src={images.tomato} alt={props.item.title} />
          </div>
          <div>
          <p className="card__title">{props.item.title}</p>
          <p className="card__price">{props.item.price}</p>
          </div>
        </Link>
        </div>
    </MainLayout>
  )
}

export default Products