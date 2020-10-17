import React from 'react';
import './searchResult.styles.scss';
import DisplayProfile from '../../../reusable-component/displayProfile/displayProfile.component';


const SearchResult = ({ url, path, _id, firstName, lastName, userName, email, occupation, organisation, description, profilePic }) => {

    return (
        <div className='searchResult'>
            <DisplayProfile path={path} url={url} profileId={_id} imageUrl={profilePic} size='small' />
            <div className='information'>
                <h2>{firstName + ' ' + lastName}</h2>
                <h2>{userName}</h2>
                <h3>{organisation}</h3>
                <h4>{description}</h4>
            </div>
            <div className='contactInfo information'>
                <h1>{occupation}</h1>
                <h1>{email}</h1>
            </div>
        </div>
    );
}

export default React.memo(SearchResult);