import React from 'react';
import './customInput.styles.scss';

const CustomInput = ({ label, changeHandler, value, id, display, type, size }) => {
    var inputContainerStyle = display ? { display: 'inline-block' } : { margin: '1vw' };
    var inputStyle = size ? { fontSize: '1em', width: '100%' } : null;
    return (
        <div className='input-container' style={inputContainerStyle}>
            <input
                className='input'
                onChange={changeHandler}
                value={value}
                id={id}
                placeholder={label}
                type={`${type ? type : null}`}
                style={inputStyle}
            />
        </div>
    ); 
}

export default CustomInput;