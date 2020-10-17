import React, { useState, useEffect } from 'react';
import './membersinfo.styles.scss';

import DisplayProfile from '../../../../../reusable-component/displayProfile/displayProfile.component';

const MembersInfo = (props) => {
    /* 
    _id,
    userName,
    profilePic,
    firstName,
    lastName,
    organisation,
    occupation,
    description,
    email,
    projects{compeleted,current} 
    */

    return (
        <div className='currentusers footerSectionChild'>
            {
                props.members.length ?
                props.members.map((item, index) => { 
                    return (
                        <div className='member' key={index}>
                            <DisplayProfile
                                imageUrl={item.profilePic}
                                profileId={item._id}
                                size='x-small'
                            />
                            <h5 style={{color:'white'}}>{item.userName}</h5>
                        </div>
                    );
                }) :
                null
            }
        </div>
    );
}

export default MembersInfo;