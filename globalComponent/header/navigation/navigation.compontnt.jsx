import React, { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import './navigation.styles.scss';

import { RiUserSearchFill } from 'react-icons/ri';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { GoProject } from 'react-icons/go';
import { IconContext } from 'react-icons';

import LogoutFunctionContext from '../../../globalContext/logoutFunctionContext';

import CustomButton from '../../../reusable-component/customButton/customButton.component';

const Navigation = ({ userId }) => { 

    const [isActive, SetActive] = useState({activeElement:'null'});    

    const setActiveElement=(activeElement)=>{ 
        SetActive({ activeElement: activeElement });
    }

    const logoutHandler = useContext(LogoutFunctionContext);

    return (
                <nav className='appNavigation'>
                    <ul className='appNavigationItems'>
                
                        <Link to={`/search`}>
                            <li
                                className={'appNavigationItem icon'}
                                title='search profile'
                                onClick={(e)=>setActiveElement('search')}
                            >
                                <IconContext.Provider value={{ className: `react-icons ${isActive.activeElement === 'search' ? 'active' : null}` }}>                                        
                                    <RiUserSearchFill />
                                </IconContext.Provider>
                            </li>
                        </Link>
                                
                        <Link to='/projectDesignPage'>
                            <li
                                className='appNavigationItem icon' 
                                title='projectDesignPage'
                                onClick={(e)=>setActiveElement('projectDesignPage')}
                            >
                                <IconContext.Provider value={{className: `react-icons ${isActive.activeElement==='projectDesignPage' ? 'active' : null}`}}>
                                    <GoProject />
                                </IconContext.Provider>
                            </li>    
                        </Link>

                        <Link to='/chat'>
                            <li
                                className="appNavigationItem icon"
                                title='chat'
                                onClick={(e)=>setActiveElement('chat')}
                            >
                                <IconContext.Provider value={{className: `react-icons ${isActive.activeElement==='chat' ? 'active' : null}`}}>
                                    <BsFillChatDotsFill />
                                </IconContext.Provider>
                            </li>
                        </Link>
                            
                        <li className='appNavigationItem' title='logout'>
                            <CustomButton
                                content='Logout'
                                clickHandler={logoutHandler}
                                size='medium'
                            />
                        </li>
                    </ul>
               </nav>
    );
}

export default React.memo(Navigation);
