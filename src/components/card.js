import React from 'react';
import Style from "../assets/styles/card.module.scss"
import FrontCard from "../assets/images/bg-card-front.png"
import BackCard from "../assets/images/bg-card-back.png"
import Logo from "../assets/images/card-logo.svg"

const UiCard = ({
    number,
    name,
    date,
    cvv
}) => {

    return (
        <div className={Style.position}>
            <div className={Style.cardFront}>
                <img src={FrontCard} className={Style.card}/>
                <div className={Style.credentials}>
                    <img src={Logo}/>
                    <h1 className={Style.number}>{number}</h1>
                    <div className={Style.sub}>
                        <h3>{name}</h3>
                        <h3>{date}</h3>
                    </div>
                </div>
            </div>
            <div className={Style.cardBack}>
                <img src={BackCard} className={Style.card}/>
                <div className={Style.credentials}>
                    <h3 className={Style.cvv}>{cvv}</h3>
                </div>
            </div>
        </div>
    );
};

export default UiCard;