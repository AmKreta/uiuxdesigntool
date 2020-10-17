import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import io from 'socket.io-client';

import Header from './globalComponent/header/header.component';
import SignUp from './lognAndSignUpForm/signUp/signUp.component';
import Profile from './reusable-component/profile/profile.component';
import SearchProfile from './Main/searchProfile/searchProfile.component';
import Chat from './Main/chat/chat.component';
import ProjectDesignPage from './Main/projectDesignPage/projectDesignPage.component';

import UserInfoContext from './globalContext/userInfoContext';
import LogoutFunctionContext from './globalContext/logoutFunctionContext';
import SetCurrentUserFunctionContext from './globalContext/setCurrentUserFunction.context';
import AsyncRequestLinkContext from './globalContext/asyncRequestLinkContext';


class Component extends React.Component {
    constructor() {
        super();
        this.state = {
            currentUser: 'guest',
            userId: null,
            socket: null,
            projectDesignSocket: null,
            socketUrl: "https://192.168.43.201:8000"
        };
    }

    componentDidMount() {
        /* if user has not logged out */
        let currentUser = localStorage.getItem('currentUser');
        let userId = localStorage.getItem('userId');
        if (currentUser !== 'guest' && userId) {
            this.setState({
                currentUser: currentUser,
                userId: userId,
                socket: io(this.state.socketUrl),
                projectDesignSocket: io(`${this.state.socketUrl}/ProjectDesignPage`)
            }, function () {
                this.state.socket.emit('registerUser', { userId });
            });
        }
    }

    setCurrentUser = (data) => {
        /* function used in loginAndSignupPage/signUp.component 
            data in following format-
                createdAt: "2020-09-15T04:36:31.490Z"
                description: "hello world!"
                email: "kamresh485@gmail.com"
                firstName: "Amresh"
                lastName: "Kumar"
                occupation: "designer"
                organisation: "freelancing"
                password: "Am_Kreta"
                projects: {completed: 0, current: 0}
                updatedAt: "2020-09-15T04:36:31.490Z"
                userName: "Am_Kreta"
                __v: 0
                _id: "5f6044cfd5f0310bade50a54" 
        */
        let Id = data.id ? data.id : data._id;
        this.setState({
            currentUser: data.userName,
            userId: Id,
            socket: io(this.state.socketurl),
            projectDesignSocket: io(`${this.state.socketurl}/ProjectDesignPage`)
        }, function () {
            localStorage.setItem('currentUser', this.state.currentUser);
            localStorage.setItem('userId', this.state.userId);
            this.state.socket.emit('registerUser', { userId: Id });
            console.log(this.state);
        });
    }

    logoutHandler = () => {
        if (this.state.currentUser !== 'guest') {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('userId');
            this.setState({
                currentUser: 'guest',
                userId: null,
                socket: null,
                projectDesignSocket: null
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                <AsyncRequestLinkContext.Provider value='https://192.168.43.201:8000'>
                    {/*
                        context used in-
                          loginANdsignupPage/signUp,
                          header/navigation/login,
                          reusableComponent/profile
                    */}
                    <UserInfoContext.Provider value={{ userId: this.state.userId, userName: this.state.currentUser }}>
                        {/*context consumer in header/navigation/navigation.component.jsx */}
                        <LogoutFunctionContext.Provider value={this.logoutHandler}>
                            {/* context consumer in header/navigation/logout.component.jsx */}
                            <SetCurrentUserFunctionContext.Provider value={this.setCurrentUser}>
                                {/* context consumer in header/login/login.component.jsx */}
                                <Header {...this.state} />
                            </SetCurrentUserFunctionContext.Provider>
                        </LogoutFunctionContext.Provider>

                        <Switch>
                            <Route
                                exact
                                path='/'
                                render={
                                    this.state.currentUser === 'guest'
                                        ? () => <Redirect to='/signUp' />
                                        : () => <Redirect to={`/profile/${this.state.userId}`} />
                                }
                            />

                            <Route
                                exact
                                path='/signUp'
                                render={
                                    this.state.currentUser === 'guest'
                                        ? () => <SignUp setCurrentUser={this.setCurrentUser} />
                                        : () => <Redirect to='/' />
                                }
                            />

                            <Route
                                exact
                                path='/profile/:profileId'
                                render={
                                    this.state.currentUser === 'guest'
                                        ? () => <Redirect to='/signUp' />
                                        : (props) => <Profile {...props} />
                                }
                            />

                            <Route
                                exact
                                path='/search'
                                render={
                                    this.state.currentUser === 'guest'
                                        ? () => <Redirect to='/signUp' />
                                        : (props) => <SearchProfile {...props} />
                                }
                            />

                            <Route
                                exact
                                path='/chat'
                                render={() => <Chat {...this.state} />}
                            />

                            <Route
                                exact
                                path='/projectdesignpage'
                                render={
                                    this.state.currentUser === 'guest'
                                        ? () => <Redirect to='/signUp' />
                                        : (props) => <ProjectDesignPage {...props} projectDesignSocket={this.state.projectDesignSocket} />
                                }
                            />

                        </Switch>
                    </UserInfoContext.Provider>
                </AsyncRequestLinkContext.Provider>
            </React.Fragment>
        );
    }
}

export default Component;

