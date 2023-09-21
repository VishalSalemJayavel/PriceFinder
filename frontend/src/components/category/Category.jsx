import React, { useState, useEffect } from 'react'
import { images } from '../../constants'
import './category.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Category = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/categories');
                const data = response.data;

                const categoryArray = data.map((category) => ({
                    categoryName: category.name,
                    imgSrc: category.image,
                }));

                setCategories(categoryArray);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="app__featured">
            <div className='app__featured-title'>
                <p>Categories</p>
            </div>
            {categories.map((category, index) => (
                <div key={index} className='app__featured-card'>
                    <Link to="/products">
                        <img src={category.imgSrc} alt={category.categoryName} />
                        <p>{category.categoryName}</p>
                    </Link>
                </div>)
            )}
            {/* <div className='app__featured-card'>
                <Link to="/products">
                    <img src={categories.imgSrc} className="card__image" alt={images.tomato} />
                    <p className="card__title">{categories.name}</p>
                </Link>
            </div> */}
        </div>
    )
}

export default Category