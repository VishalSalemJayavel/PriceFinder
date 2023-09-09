import React from 'react'

const Featured = (props) => {
    return (
        <div className="app__featured">
            <img src={`../assets/${props.item.coverImg}`} className="card__image" alt={props.name} />
            <p className="card__title">{props.item.title}</p>
            <p className="card__price">${props.item.price}</p>
        </div>
    )
}

export default Featured