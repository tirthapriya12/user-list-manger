import React from 'react';
import PropTypes from "prop-types";
import Card from '../card/card';
import './card-list.scss';


const CardList = ({ cards, onCardClick }) => {

    return (
        <section className="card-list">
            {
                cards && cards.map((card) => {
                    return (<Card
                        key={card.id}
                        image={card.image}
                        name={card.name}
                        desc={card.description}
                        price={card.price}
                        onClick={()=>{onCardClick(card)}}
                    />)
                })
            }
        </section>
    )
}

CardList.propTypes = {
    cards: PropTypes.array.isRequired
}

export default CardList;