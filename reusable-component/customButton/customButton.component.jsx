import React from 'react';
import './customButton.styles.scss';

const CustomButton = ({ content, clickHandler, size, inverted }) => {
    return (
        <button
            className={`Button ${size} ${inverted?'inverted':null}`}
            onClick={clickHandler}
        >
            {content}
        </button>
    ); 
}

export default React.memo(CustomButton);
