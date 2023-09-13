import React from 'react'
import {images} from '../../constants'

const Featured = (props) => {
    console.log(props.item.coverImg)

    return (
        <div className="app__featured">
            {/* <img src={images.tomato} className="card__image" alt={props.item.title} /> */}
            <p className="card__title">{props.item.title}</p>
        </div>
    )
}

export default Featured