import React from 'react';
import { Link } from 'react-router-dom';

import './header.styles.scss';
import Navigation from './navigation/navigation.compontnt';
import Login from './login/login.component';

const Header = ({ currentUser, userId }) => {
    return (
        <header className='appHeader'>
            <Link to={`/profile/${userId}`}>
                <h1 title='home'>UiUXD</h1>
            </Link>
            {
                currentUser !== 'guest'
                ? <Navigation />
                : <Login />
            }
        </header>
    );
}

export default React.memo(Header);