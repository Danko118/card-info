import React from 'react';
import Style from '../assets/styles/background.module.scss'
import bg from '../assets/images/bg-main.png'

const UiBackground = () => {
    return (
        <div className={Style.window}>
            <img src={bg} />
        </div>
    );
};

export default UiBackground;