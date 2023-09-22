import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './singleProduct.css'

const SingleProduct = () => {
  let { productId } = useParams();

  const[product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    currency: "",
    stocks: null,
    unit: "",
    imgSrc: ""
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/products/' + productId + '/');
        const data = response.data;

        console.log(data);

        setProduct({
          title: data.title,
          description: data.description,
          price: data.price,
          currency: data.currency,
          stocks: data.stocks,
          unit: data.unit,
          imgSrc: data.image,
        });

      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="product">
      <div className='product__img'>
        <img src={product.imgSrc} className="card__image" alt={product.title} />
      </div>
      <div className='product__details'>
        <p className="card__titles">{product.title}</p>
        <p className="card__description">{product.description}</p>
        <p className="card__price">{product.price}{product.currency}</p>
        <p className="card__stocks">In stock: {product.stocks}{product.unit}</p>
      </div>
      {/* {products.map((product) => (
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
      ))} */}
    </div>
  )
}

export default SingleProduct