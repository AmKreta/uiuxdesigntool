import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import './displayProfile.styles.scss';

const DisplayProfile = ({ imageUrl, profileId, size , noRedirect }) => {

    const [clicked, setClicked] = useState(false);

    const Style ={backgroundImage: imageUrl?`url(${imageUrl})` : `#9400D3` };
    
    if (!clicked && !noRedirect ) {
        return <div style={Style} className={`displayProfile ${size}`} onClick={(e)=>setClicked(true)}/>;
    }
    else { 
        return <Redirect to={`./profile/${profileId}`} />
    }
}

export default React.memo(DisplayProfile);
