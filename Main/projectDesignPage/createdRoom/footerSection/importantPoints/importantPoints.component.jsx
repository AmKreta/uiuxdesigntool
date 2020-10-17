import React, { useState } from 'react';
import { RiSendPlane2Fill } from 'react-icons/ri';
import { IconContext } from 'react-icons/lib';

import './importantPoints.styles.scss';

const ImportantPoints = (props) => {
    /* importPoints */
    const [importantPoint, setImportantPoint] = useState('');

    const changeHandler = (e) => { 
        setImportantPoint(e.target.value);
    }

    return (
        <div className='importantPoints footerSectionChild'>
            <div className='showImportantPoints'>
            {
                props.importantPoints.map((item, index) => { 
                    return (
                        <div className='importantPoint' key={index} >{item.by}: {item.point}</div>    
                    );
                })
            }
            </div>
            <div className='inputImportantPoint'>
                <input
                    placeholder='input text here'
                    onChange={changeHandler}
                    value={importantPoint}
                    id='addImportantPoint'
                    type='text'
                />
                <IconContext.Provider value={{className:'sendIcon'}}>
                    <RiSendPlane2Fill title='send' onClick={(e) => { setImportantPoint(); props.submitImportantPoint(importantPoint); }}/>
                </IconContext.Provider>
            </div>
        </div>
    );
}

export default ImportantPoints;