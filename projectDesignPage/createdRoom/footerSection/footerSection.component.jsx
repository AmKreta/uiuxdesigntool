import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './footerSection.styles.scss';

import ChatSection from './chatSection/chatSection.component';
import MembersInfo from './membersInfo/membersinfo.component';
import ImportantPoints from './importantPoints/importantPoints.component';
import Pages from './pages/pages.component';
import SaveProject from './save Project/saveProject.component';

import AsyncRequestLinkContext from '../../../../globalContext/asyncRequestLinkContext';
import UserInfoContext from '../../../../globalContext/userInfoContext';


import { BsFillChatFill, BsIntersect, BsFillPeopleFill } from 'react-icons/bs';
import { AiFillStar, AiTwotoneSave } from 'react-icons/ai';
import { IconContext } from 'react-icons';


const FooterSection = (props) => {
    /* projectDesignSocket,isAdmin,userList,currentRoom */
    const [activePage, setActivePage] = useState('chatSection');

    const [members, setMembers] = useState([]);
    const [importantPoints, setImportantPoints] = useState([]);
    const [chat, setChat] = useState([]);

    const link = useContext(AsyncRequestLinkContext);
    const { userName } = useContext(UserInfoContext);

    useEffect(() => {
        props.projectDesignSocket.on('importantPoint', function ({ userName, point }) {
            setImportantPoints(prevState => {
                return [...prevState, { by: userName, point: point }];
            });
        });
        props.projectDesignSocket.on('chat', function ({ userName, chat }) {
            setChat(prevState => {
                return [...prevState, { by: userName, chat: chat }];
            });
        });
        return () => {
            props.projectDesignSocket.off('newImportantPoint');
            props.projectDesignSocket.off('chat');
        }
    }, []);

    useEffect(() => {
        (async () => {
            let promise = props.userList.map((item, index) => {
                return axios.get(`${link}/user/getUserById?userId=${item}`).catch(err => err);
            });
            setMembers((await Promise.all(promise)).map(item => item.data));
        })();
    }, [props.userList]);

    const submitChat = (chat) => {
        setChat(prevState => {
            return [...prevState, { by: userName, chat: chat }];
        });
        props.projectDesignSocket.emit('addChat', { room: props.currentRoom, data: { userName: userName, chat: chat } });
    }

    const submitImportantPoint = (point) => {
        setImportantPoints(prevState => {
            return [...prevState, { by: userName, point: point }];
        });
        props.projectDesignSocket.emit('addImportantPoint', { room: props.currentRoom, data: { userName: userName, point: point } });
    }

    return (
        <div className='footerSection'>

            <div className='selectTab'>
                <IconContext.Provider value={{ className: `footerTab ${activePage === 'save' ? 'activeTab' : null}` }}>
                    <AiTwotoneSave
                        title='save'
                        onClick={(e) => { setActivePage('save') }}
                    />
                </IconContext.Provider>
                <IconContext.Provider value={{ className: `footerTab ${activePage === 'pages' ? 'activeTab' : null}` }}>
                    <BsIntersect
                        title='pages'
                        onClick={(e) => { setActivePage('pages') }}
                    />
                </IconContext.Provider>
                <IconContext.Provider value={{ className: `footerTab ${activePage === 'chatSection' ? 'activeTab' : null}` }}>
                    <BsFillChatFill
                        title='chat section'
                        onClick={(e) => { setActivePage('chatSection') }}
                    />
                </IconContext.Provider>

                <IconContext.Provider value={{ className: `footerTab ${activePage === 'importantPoints' ? 'activeTab' : null}` }}>
                    <AiFillStar
                        title='important points'
                        onClick={(e) => { setActivePage('importantPoints') }}
                    />
                </IconContext.Provider>

                <IconContext.Provider value={{ className: `footerTab ${activePage === 'membersInfo' ? 'activeTab' : null}` }}>
                    <BsFillPeopleFill
                        title='members'
                        onClick={(e) => { setActivePage('membersInfo') }}
                    />
                </IconContext.Provider>

            </div>
            {
                (() => {
                    if (activePage === 'chatSection') {
                        return <ChatSection chat={chat} submitChat={submitChat} />
                    }
                    else if (activePage === 'importantPoints') {
                        return <ImportantPoints importantPoints={importantPoints} submitImportantPoint={submitImportantPoint} />
                    }
                    else if (activePage === 'membersInfo') {
                        return <MembersInfo members={members} />
                    }
                    else if (activePage === 'pages') {
                        return <Pages isAdmin={props.isAdmin} />
                    }
                    else if (activePage === 'save') {
                        return <SaveProject userList={props.userList} currentRoom={props.currentRoom} />
                    }
                })()
            }
        </div>
    );
}

export default FooterSection;