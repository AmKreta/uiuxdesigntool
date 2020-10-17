import React from 'react';
import RgbSelector from './rgbSelector/rgbSelector.component'
import ActiveElementInfo from './activeElementInfo/activeElementInfo.component';
const ToolBarB = () => {

    return (
        <div className='toolBarB'>
            <RgbSelector />
            <ActiveElementInfo />
        </div>
    );
}

export default ToolBarB;