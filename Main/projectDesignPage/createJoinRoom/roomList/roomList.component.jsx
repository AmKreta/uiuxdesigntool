import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import './roomList.styles.scss';

import AsyncRequestLink from '../../../../globalContext/asyncRequestLinkContext';
import SetCurrentRoomAndUserListContext from '../../setCurrentRoomAndUserListContext';
import UserInfoContext from '../../../../globalContext/userInfoContext';

import CustomInput from '../../../../reusable-component/customInput/customInput.component';
import CustomButton from '../../../../reusable-component/customButton/customButton.component';
import DisplayProfile from '../../../../reusable-component/displayProfile/displayProfile.component';

const RoomList = ({ projectDesignSocket, room /*[name,socket] */ }) => {

    const [password, setPassword] = useState('');
    const [members, setMembers] = useState([]);
    const [inputLabel, setInputLabel] = useState('enter password');

    const Link = useContext(AsyncRequestLink);
    const { setCurrentRoom, setUserList } = useContext(SetCurrentRoomAndUserListContext);
    const currentUserInfo = useContext(UserInfoContext);

    useEffect(() => {
        projectDesignSocket.emit('getRoomInfo', room[0]);
        projectDesignSocket.on('roomInfo', async function (data) {
            /* getting ingo of all users in array */
            console.log(data);
            setUserList([...data.map(item => item.userId),currentUserInfo.userId]);
            let promise = data.map(({ socketId, userId }) => {
                return axios.get(`${Link}/user/getUserById?userId=${userId}`).catch(err => null);
            });
            setMembers((await Promise.all(promise)).filter(item => {
                if (item) { 
                    return item.data;
                }
            }));
        });
        return () => {
            projectDesignSocket.off('roomInfo');
        }
    }, []);

    const changeHandler = (e) => {
        setPassword(e.target.value);
    }

    const clickHandler = (e) => {
        projectDesignSocket.emit('join-room', { roomName: room[0], password: password });
        projectDesignSocket.on('joined', function () {
            setCurrentRoom(room[0]);
        });
        projectDesignSocket.on('failed', function () {
            setPassword('');
            setInputLabel('enter correct password');
        });
    }

    return (
        <section className='roomInfo'>
            <h1 className='RoomName'>{room[0]}</h1>
            <div className='enterRoom'>
                <div className='roomPassword'>
                    <CustomInput
                        type='text'
                        display='inline'
                        label={inputLabel}
                        value={password}
                        changeHandler={changeHandler}
                    />
                </div>
                <CustomButton
                    content='enter'
                    size='xx-small'
                    clickHandler={clickHandler}
                />
            </div>
            <div className='roomMembers'>
                {
                    members.length
                        ? members.map((item, index) => {
                            return (
                                <div className='memberInfo' key={index}>
                                    <DisplayProfile
                                        imageUrl={item.data.profilePic}
                                        profileId={item.data._id}
                                        size='x-small'
                                    />
                                    <p className='memberUserName'>{item.data.userName}</p>
                                </div>
                            );
                        })
                        :
                        <p>Room empty</p>
                }
            </div>
        </section>
    );
}

export default RoomList;