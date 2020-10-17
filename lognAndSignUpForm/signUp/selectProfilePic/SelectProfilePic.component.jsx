import React from 'react';
import './SelectProfilePic.styles.scss';

class SelectProfilePicture extends React.Component { 
    constructor(props) { 
        super(props);
        this.state = { profilePicture: '' };
    }
    render() { 
        return (
            <label className='profilePicLabel' htmlFor='profilePic' ref={this.props.Ref} title='select profile pic'>
            select Profile Pic
            <input
                type='file'
                id='profilePic'
                onChange={(e) => {
                    e.persist();
                    this.props.Ref.current.innerText = 'change selected image';
                    this.props.changeHandler(e);
                }}
                value={this.state.profilePic}
                style={{ display: 'none' }}
            />
        </label>
        );
    }
}

export default SelectProfilePicture;