import React from 'react'
import {images} from '../../constants'
import './category.css';

const Category = (props) => {
    console.log(props.item.coverImg)

    return (
        <div className="app__featured">
            <div className='app__featured-title'><p>Categories</p></div>
            <div className='app__featured-card'>
            <img src={images.tomato} className="card__image" alt={props.item.title} />
            <p className="card__title">{props.item.title}</p>
            </div>
        </div>
    )
}

export default Category