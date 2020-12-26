import React, { useState, useEffect } from 'react';

import './createJoinRoom.styles.scss';
import RoomList from './roomList/roomList.component';

import CustomInput from '../../../reusable-component/customInput/customInput.component';
import CustomButton from '../../../reusable-component/customButton/customButton.component';

const CreateJoinRoom = ({ projectDesignSocket }) => {

    const [roomName, setRoomName] = useState('');
    const [createPassword, setCreatePassword] = useState('')
    const [availableRooms, setAvailableRooms] = useState([]);

    useEffect(() => {
        projectDesignSocket.emit('getAvailableRooms');
        projectDesignSocket.on('availableRooms', function (data) {
            console.log(data);
            Object.keys(data).forEach((item, index) => {
                if (item.includes('room-')) {
                    console.log(item, data[item])
                    setAvailableRooms(prevState => [
                        ...prevState,
                        [item, data[item]] //room-name:room Obje
                    ]);
                }
            });
        });
        return () => {
            projectDesignSocket.off('availableRooms');
        }
    }, []);

    const createRoom = (e) => {
        projectDesignSocket.emit('createRoom', { name: roomName, password: createPassword });
    }

    return (
        <React.Fragment>
            <div className='createGroup'>
                <h1>Create Room</h1>
                <div className='roomInfoInput'>
                    <CustomInput
                        label='name'
                        changeHandler={(e) => setRoomName(e.target.value)}
                        value={roomName}
                    />
                    <CustomInput
                        label='password'
                        changeHandler={(e) => setCreatePassword(e.target.value)}
                        value={createPassword}
                    />
                </div>
                <div className='roomCreateButton'>
                    <CustomButton
                        content='create'
                        clickHandler={createRoom}
                        size='small'
                        inverted
                    />
                </div>
            </div>

            <div className='verticleRule' />

            <div className={`joinGroup ${availableRooms.length ? 'roomAvailable' : 'roomNotAvailable'}`}>
                {
                    availableRooms.length
                        ? availableRooms.map((item, index) => {
                            return <RoomList projectDesignSocket={projectDesignSocket} room={item} key={index} />
                        })
                        : <h1>no room available</h1>
                }
            </div>
        </React.Fragment>
    );
}

export default CreateJoinRoom;