import React, { useState, useContext } from 'react';
import axios from 'axios';

import './searchProfile.styles.scss';
import CustomInput from '../../reusable-component/customInput/customInput.component'; 
import CustomButton from '../../reusable-component/customButton/customButton.component';
import SearchResult from './searchResult/searchResult.component';

import AsyncRequestLinkContext from '../../globalContext/asyncRequestLinkContext';

const SearchProfile = (props) => {
    const link = useContext(AsyncRequestLinkContext);

    const [searchInput, setSearchInput] = useState('');

    const [userList, setUserList] = useState([]);

    const searchForUsers = () => { 
        if (searchInput!=='') {
            axios.get(`${link}/user/searchUser?search=${searchInput}`).then(response => {
                setUserList(response.data);
                console.log(response.data)
            }).catch(err => {
                alert('something went wrong');
            })
        }
        else { 
            alert('enter valid input');
        }
    }
    return (
        <div className='profileSearchContainer'>
            <CustomInput
                label='search here'
                type='text'
                value={searchInput}
                id='profileSearch'
                display='inline-block'
                size='large'
                changeHandler={(e)=>setSearchInput(e.target.value)}
            />
            <CustomButton
                content='search'
                clickHandler={searchForUsers}
                size='small'
                inverted
            />
            <br />
            <div className='searchResults'>
                {
                    userList.map((item, index) => { 
                        return (
                            <SearchResult key={index} {...item} path={props.match.path} url={props.match.url}/>
                        );
                    })
                }
            </div>
            
        </div>
    );
}

export default React.memo(SearchProfile);