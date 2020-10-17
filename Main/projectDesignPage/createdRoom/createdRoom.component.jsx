import React, { useEffect, useContext } from 'react';

import './createdRoom.Styles.scss';

import VideoConfrence from './videoConfrence/videoConfrence.component';
import UiUxDesign from './uiUxDesign/uiUxDesign.component';
import FooterSection from './footerSection/footerSection.component';

import SetCurrentRoomAndUserListContext from '../setCurrentRoomAndUserListContext';
import userInfoContext from '../../../globalContext/userInfoContext';

const CreatedRoom = (props) => {
    /* projectDesignSocket,isAdmin,userList,currentRoom */

    const { setUserList } = useContext(SetCurrentRoomAndUserListContext);
    const { userName, userId } = useContext(userInfoContext);

    useEffect(() => {
        props.projectDesignSocket.on('newMemberJoined', function ({ socketId, userId }) {
            if (userId && !props.userList.includes(userId)) {
                console.log(userId + ' joined');
                setUserList(prevState => [...prevState, userId]);
            }
        });
        return () => {
            props.projectDesignSocket.off('newMemberJoined');
        }
    }, []);
    return (
        <section className='createdRoom'>
            <VideoConfrence {...props} userName={userName} userId={userId} />
            <UiUxDesign {...props} />
            <FooterSection {...props} />
        </section>
    );
}

export default CreatedRoom;