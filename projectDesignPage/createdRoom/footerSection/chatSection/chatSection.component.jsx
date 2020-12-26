import React, { useState } from 'react';
import './chatSection.styles.scss';
import { RiSendPlane2Fill } from 'react-icons/ri';
import { IconContext } from 'react-icons';

const ChatSection = (props) => {
    /* chat */
    const [chatInput, setChatInput] = useState('');

    const changeHandler = (e) => {
        setChatInput(e.target.value);
    }

    return (
        <div className='chatSection footerSectionChild'>
            <div className='CHAT' >
                {
                    props.chat.map((item, index) => {
                        return (
                            <React.Fragment>
                                <div key={index} className='message'>{item.by} : {item.chat}</div>
                            </React.Fragment>
                        );
                    })
                }
            </div>
            <div className='inputChat'>
                <input
                    placeholder='input text here'
                    onChange={changeHandler}
                    value={chatInput}
                    id='send'
                    type='text'
                />
                <IconContext.Provider value={{ className: 'sendIcon' }}>
                    <RiSendPlane2Fill title='send' onClick={(e) => { setChatInput(''); props.submitChat(chatInput); }} />
                </IconContext.Provider>
            </div>
        </div>
    );
}

export default ChatSection;