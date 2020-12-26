import React, { useState, useEffect, useContext } from 'react';

import './projectDesignPage.styles.scss';
import CreatedRoom from './createdRoom/createdRoom.component';
import CreateJoinRoom from './createJoinRoom/createJoinRoom.component';

import SetCurrentRoomAndUserListContext from './setCurrentRoomAndUserListContext';
import UserInfoContext from '../../globalContext/userInfoContext';

const ProjectDesignPage = ({ /*history, location, match,*/ projectDesignSocket }) => {

    const [currentRoom, setCurrentRoom] = useState(null);
    const [userList, setUserList] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    const { userId } = useContext(UserInfoContext);

    useEffect(() => {
        projectDesignSocket.on('roomCreated', function (data) {
            console.log(data);
            setCurrentRoom(data);
            setIsAdmin(true);
            setUserList([userId]);
        });
        return () => {
            projectDesignSocket.off('roomCreated');
        }
    }, [])

    if (currentRoom) {
        return (
            <SetCurrentRoomAndUserListContext.Provider value={{ setCurrentRoom: setCurrentRoom, setUserList: setUserList }}>
                <div className='ProjectDesignPage room'>
                    <CreatedRoom
                        projectDesignSocket={projectDesignSocket}
                        currentRoom={currentRoom}
                        isAdmin={isAdmin}
                        userList={userList}
                    />
                </div>
            </SetCurrentRoomAndUserListContext.Provider>
        );
    }
    else {
        return (
            <div className='ProjectDesignPage createJoinRoom'>
                <SetCurrentRoomAndUserListContext.Provider value={{ setCurrentRoom: setCurrentRoom, setUserList: setUserList }}>
                    <CreateJoinRoom
                        projectDesignSocket={projectDesignSocket}
                    />
                </SetCurrentRoomAndUserListContext.Provider>
            </div>
        );
    }
}


export default ProjectDesignPage;