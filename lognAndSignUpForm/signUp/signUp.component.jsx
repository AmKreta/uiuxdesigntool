import React from 'react';
import axios from 'axios';

import './signUp.styles.scss';
import CustomInput from '../../reusable-component/customInput/customInput.component';
import CustomButton from '../../reusable-component/customButton/customButton.component';
/*import SelectProfilePicture from './selectProfilePic/SelectProfilePic.component';*/

import AsyncRequestLinkContext from '../../globalContext/asyncRequestLinkContext';

class SignUp extends React.PureComponent { 
    constructor(props) { 
        super();
        this.state = {
            firstName: '',
            lastName: '',
            userName:'',
            email: '',
            profilePic: '',
            password: '',
            password1:''
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.resetHandler = this.resetHandler.bind(this);
        this.labelRef = React.createRef();
    }
    changeHandler(event) {
        this.setState({ [event.target.id]: event.target.value }, () => { 
            console.log(this.state);
        });
    }
    submitHandler(e,link) {
        e.preventDefault();
        axios.post(`${link}/user`, this.state)
        .then(response => { 
            this.props.setCurrentUser(response.data);
        /* function defined in component.jsx for setting userName for app */
        }).catch(error => {
            alert('enter valid info');
        });
    }
    resetHandler(e) {
        e.preventDefault();
        this.labelRef.current.innetText = 'select Profile Picture';
        for (let i in this.state) { 
            this.setState({[i]:''});
        }
    }
    render() {
        return (
                <AsyncRequestLinkContext.Consumer>
                    {
                        link=>{
                            return(
                                <div className='container' >
                                    <form className='signUp-form' method='post' encType='multipart/form-data'>
                                        <h1>Sign Up</h1>
                                        <CustomInput
                                            label='first name'
                                            changeHandler={this.changeHandler}
                                            id='firstName'
                                            value={this.state.firstName}
                                        />
                                        <CustomInput
                                            label='last name'
                                            changeHandler={this.changeHandler}
                                            id='lastName'
                                            value={this.state.lastName}
                                        />

                                        <CustomInput
                                            label='userName'
                                            changeHandler={this.changeHandler}
                                            id='userName'
                                            value={this.state.userName}
                                        />

                                        <CustomInput
                                            label='Email'
                                            changeHandler={this.changeHandler}
                                            id='email'
                                            value={this.state.email}
                                        />

                                        <CustomInput
                                            label='password'
                                            changeHandler={this.changeHandler}
                                            id='password'
                                            value={this.state.password}
                                            type='password'
                                        />
                                        
                                        <CustomInput
                                            label='confirm password'
                                            changeHandler={this.changeHandler}
                                            id='password1'
                                            value={this.state.password1}
                                            type='password'
                                        />
                                            
                                        <CustomButton
                                            content='Sign Up'
                                            clickHandler={(e)=>{e.persist();this.submitHandler(e,link);}}
                                            size='medium'
                                        />
                                        
                                        <CustomButton
                                            content='Reset'
                                            clickHandler={this.resetHandler}
                                            size='medium'
                                        />    
                                    </form> 
                                </div>
                            );
                        }
                    }
                </AsyncRequestLinkContext.Consumer>
            );
        }
}

export default SignUp;
