import React from 'react';
import axios from 'axios';

import SetCurrentUserFunctionContext from '../../../globalContext/setCurrentUserFunction.context';
import AsyncRequestLinkContext from '../../../globalContext/asyncRequestLinkContext';

import './login.styles.scss';
import CustomButton from "../../../reusable-component/customButton/customButton.component";
import CustomInput from "../../../reusable-component/customInput/customInput.component";


class Login extends React.Component {
    constructor() { 
        super();
        this.state = {email:'',password:''};
        this.changeHandler = this.changeHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
    }
    
    changeHandler(e) { 
        this.setState({ [e.target.id]: e.target.value });
    }

    clickHandler(e,link,setCurrentUserFunction) { 
        axios.get(`${link}/user?email=${this.state.email}&password=${this.state.password}`)
        .then(response => { 
            setCurrentUserFunction(response.data);
            /* function defined in component.jsx */
            console.log(response.data);
        })
        .catch((err) => { 
            alert('enter correct username and password');
            console.log(err);
        })
    }

    render() { 
        return (
            <form id='loginForm'>
                <CustomInput
                    label='email'
                    id='email'
                    value={this.state.email}
                    changeHandler={this.changeHandler}
                    display='inline'
                    size='small'
                />
                <CustomInput
                    label='password'
                    id='password'
                    value={this.state.password}
                    changeHandler={this.changeHandler}
                    display='inline'
                    size='small'
                    type='password'
                />
                <SetCurrentUserFunctionContext.Consumer>
                    {
                        /* context provider in /component.jsx */
                        setCurrentUserFunction => { 
                            return (
                               <AsyncRequestLinkContext.Consumer>
                                   {
                                       link=>{
                                           return(
                                                <CustomButton
                                                    content='login'
                                                    size='small'
                                                    clickHandler={
                                                        (e) => {
                                                            e.preventDefault();
                                                            e.persist();
                                                            this.clickHandler(e,link,setCurrentUserFunction);
                                                        }
                                                    }
                                                />
                                           );
                                       }
                                   }
                               </AsyncRequestLinkContext.Consumer>    
                            );
                        }
                    }
                </SetCurrentUserFunctionContext.Consumer>
            </form>
        );
    }
};

export default Login;