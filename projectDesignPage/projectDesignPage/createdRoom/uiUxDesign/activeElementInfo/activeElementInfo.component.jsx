import React, { useContext, useReducer } from 'react';
import './activeElementInfo.styles.scss';
import ActiveElementInfoContext from '../activeElementInfoContext';

const ActiveElementInfo = () => {
    const { element, elementId, editActiveElement } = useContext(ActiveElementInfoContext);
    return (
        <div className='activeElementInfo'>
            {
                element
                    ? (
                        <ul className='propertyList'>
                            {
                                (() => {
                                    let list = [];
                                    Object.keys(element).forEach((item, index) => {
                                        if (!(item === 'style' || item === 'onMouseDown' || item === 'onMouseUp' || item === 'onMouseOver' || item === 'onMouseOut' || item === 'render')) {
                                            list.push(
                                                <li key={index} className='propertyItem'>
                                                    {item.toUpperCase()}:
                                                        <input
                                                        className='elementProperties'
                                                        value={element[item] ? element[item] : 0}
                                                        onChange={() => { console.log('amk') }}
                                                    />
                                                </li>
                                            );
                                        }
                                    })
                                    return list.length ? list : null;
                                })()
                            }
                        </ul>

                    )
                    : null
            }
        </div>
    );
}

export default React.memo(ActiveElementInfo);