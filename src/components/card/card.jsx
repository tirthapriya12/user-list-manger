import React from 'react';
import PropTypes from "prop-types";
import './card.scss';

const Card = ({ image, name, desc, price, onClick }) => {

    return (
        <div className="card">
            <img loading="lazy" src={image} alt="Avatar" />
            <div className="container">
                <h4><b>{name}</b></h4>
                <p>{desc}</p>
                <br />
                <p>$ {price}</p>
                {onClick && <button onClick={onClick}>Select</button>}
                <br />
            </div>
        </div>
    )
}

Card.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    desc: PropTypes.string,
    price: PropTypes.string,
    onClick: PropTypes.func
}
export default Card;