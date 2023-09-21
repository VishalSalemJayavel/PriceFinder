import React, { useEffect, useState } from 'react';
import { MainLayout } from '../../layout';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './products.css';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/products');
        const data = response.data;

        console.log(data);

        const productArray = data.map((product) => ({
          id: product.uuid,
          title: product.title,
          price: product.price,
          currency: product.currency,
          stocks: product.stocks,
          unit: product.unit,
          imgSrc: product.image,
        }));

        setProducts(productArray);

      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  return (
    <MainLayout>
      <div className="products">
        {products.map((product, index) => (
          <div key={index} className='products__card'>
            <Link to={`/singleproduct/${product.id}`} className='products__container'>
              <div className="card__images">
                <img src={product.imgSrc} alt={product.title} />
              </div>
              <div className='app__products-info'>
                <p className="card__tit">{product.title}</p>
                <p className="card__price">{product.price}{product.currency}</p>
                <p className="card__stocks">In stock: {product.stocks}{product.unit}</p>
              </div>
            </Link>
          </div>
        ))}
        {/* <div className="card__images">
            <img src={images.tomato} alt={props.item.title} />
          </div>
          <div className='app__products-info'>
            <p className="card__tit">{props.item.title}</p>
            <p className="card__price">{props.item.price}</p>
          </div> */}
      </div>
    </MainLayout>
  )
}

export default Products