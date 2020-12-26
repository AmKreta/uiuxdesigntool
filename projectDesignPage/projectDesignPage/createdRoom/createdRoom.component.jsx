import React, { useEffect, useContext, useState, useRef } from 'react';

import './createdRoom.Styles.scss';

import VideoConfrence from './videoConfrence/videoConfrence.component';
import UiUxDesign from './uiUxDesign/uiUxDesign.component';
import FooterSection from './footerSection/footerSection.component';

import SetCurrentRoomAndUserListContext from '../setCurrentRoomAndUserListContext';
import userInfoContext from '../../../globalContext/userInfoContext';
import ActivePageSetActivePageContext from './activePageSetActivePageContext.component';


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

    const [footerPagesProp, setFooterPagesProp] = useState({});

    /* addPage ,deletePage, activeProjectPage,setActiveprojectpage,Pages in footerPagesProp */

    return (
        <section className='createdRoom'>
            <VideoConfrence {...props} userName={userName} userId={userId} />
            <UiUxDesign {...props} setFooterPagesProp={setFooterPagesProp} />
            <ActivePageSetActivePageContext.Provider value={{ ...footerPagesProp }}>
                <FooterSection {...props} />
            </ActivePageSetActivePageContext.Provider>
        </section>
    );
}

export default CreatedRoom;