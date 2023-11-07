import React, {useState} from 'react'
import "./Card.css";
import Button from '../Button/Button';

import pizzaImg from "../../assets/images/pizza.png";
import burgerImg from "../../images/burger.png";
import cocaImg from "../../images/coca.png";
import saladImg from "../../images/salad.png";
import waterImg from "../../images/water.png";
import iceCreamImg from "../../images/icecream.png";
import kebabImg from "../../images/kebab.png";

function Card({ food, onAdd, onRemove}) {
    // init states of count and title
    const [count, setCount] = useState(0);
    const { title, image, price } = food;

    const handleIncrement = () => {
        setCount(count + 1)
        onAdd(food)
    }
    const handleDecrement = () => {
        setCount(count - 1);
        onRemove(food)
    }

    return(
        <div className='card'>
        {/* top right badge is hidden if count === 0 dynamic format */}
            <span
                    className={`${count !== 0 ? "card__badge" : "card__badge--hidden"}`}
                >{count}
            </span>

        <div className="image__container">
            {/* Success */}
            {/* <img src={`${process.env.PUBLIC_URL}${image}`} alt={`${process.env.PUBLIC_URL}${image}`} /> */}
            {/* <img src={`${process.env.PUBLIC_URL}/assets/images/icecream.png`} alt="logo"/> */}
            {/* <img src={image} alt={`${image}`}/> */}
            {/* <img src={pizzaImg} alt={"Pizza"}/> */}
            {/* Fail */}
                {/* <img src={'/images/icecream.png'} alt={title} /> */}
                {/* <img src={window.location.origin + '/images/burger.png'} alt={title} /> */}
                {/* <img src={process.env.PUBLIC_URL + '/burger.png'}/> */}
            {/* <img src={`${process.env.PUBLIC_URL}/burger.png`} alt={`process.env.PUBLIC_URL/burger.png`} /> */}
        </div>
        {/* title consists of title and price */}

        <h4 className="card__title">
                {title} . <span className="card__price">$ {price.toFixed(2)}</span>
        </h4>
        
        <div className='btn-container'>
            {/* Add btn call handleIncrement mtd, passes title, type */}
                <Button title={"+"} type={"add"} onClick={handleIncrement} />
            {count !== 0 ? (
                // minus btn hidden while count == 0
                    <Button title={"-"} type={"remove"} onClick={handleDecrement} />
                ) : (
                 ""   
                )}
            </div>        
    </div>
    );
}

export default Card;