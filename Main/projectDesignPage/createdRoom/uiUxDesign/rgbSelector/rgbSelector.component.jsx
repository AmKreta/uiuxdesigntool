import React, { useReducer, useContext, useEffect } from 'react';
import './rgbSelector.styles.scss';

import ActiveColorContext from '../activeColorContext';

const RgbSelector = () => {

    const setActiveColor = useContext(ActiveColorContext);

    const [color, setColor] = useReducer((prevState, action) => {
        switch (action.type) {
            case 'r':
                return { ...prevState, r: action.value };
            case 'g':
                return { ...prevState, g: action.value };
            case 'b':
                return { ...prevState, b: action.value };
            case 'a':
                return { ...prevState, a: action.value / 100 };
        }
    }, { r: 0, g: 0, b: 0, a: 1 });

    useEffect(() => { 
        let colorString = `rgba(${color.r},${color.g},${color.b},${color.a})`;
        setActiveColor(colorString);
    },[color]);

    return (
        <div className='rgbColorSelector'>
            <div className='colorPicker' />
            <div className='opacityController' />

            <div className='rgb'>
                <div style={{ backgroundColor: 'white' }}>
                    <div className='colour' style={{ backgroundColor: `rgba(${color.r},${color.g},${color.b},${color.a})`, color: `rgba(${255 - color.r},${255 - color.g},${255 - color.b},${1})` }} >
                        rgba({color.r},{color.g},{color.b},{color.a})
                    </div>
                </div>
                <div className=' selectColor '>
                    <input
                        className='rgbInput red '
                        type='range'
                        min='0'
                        max='255'
                        id='r'
                        onChange={(e) => { setColor({ type: 'r', value: e.target.value }) }}
                    />
                    <input
                        type='text'
                        className='textColorInput'
                        value={color.r}
                        onChange={(e) => { setColor({ type: 'r', value: e.target.value }) }}
                    />
                </div>
                <div className=' selectColor '>
                    <input
                        className='rgbInput green '
                        type='range'
                        min='0'
                        max='255'
                        id='g'
                        onChange={(e) => { setColor({ type: 'g', value: e.target.value }) }}
                    />
                    <input
                        type='text'
                        className='textColorInput'
                        value={color.g}
                        onChange={(e) => { setColor({ type: 'g', value: e.target.value }) }}
                    />
                </div>
                <div className=' selectColor '>
                    <input
                        className='rgbInput blue '
                        type='range'
                        min='0'
                        max='255'
                        id='b'
                        onChange={(e) => { setColor({ type: 'b', value: e.target.value }) }}
                    />
                    <input
                        type='text'
                        className='textColorInput'
                        value={color.b}
                        onChange={(e) => { setColor({ type: 'b', value: e.target.value }) }}
                    />
                </div>
                <div className=' selectColor '>
                    <input
                        className='rgbInput alpha'
                        type='range'
                        min='0'
                        max='100'
                        id='a'
                        onChange={(e) => { setColor({ type: 'a', value: e.target.value }) }}
                    />
                    <input
                        type='text'
                        className='textColorInput'
                        value={color.a}
                        onChange={(e) => { setColor({ type: 'a', value: e.target.value }) }}
                    />
                </div>
            </div>
        </div>
    );
}

export default RgbSelector;