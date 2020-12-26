import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

import './saveProject.styles.scss';
import Page from '../pages/page/page.component';

import CustomButton from '../../../../../reusable-component/customButton/customButton.component';

import AsyncRequestLinkContext from '../../../../../globalContext/asyncRequestLinkContext';
import ActivePageSetActivePageContext from '../../activePageSetActivePageContext.component';

const SaveProject = ({ userList, currentRoom }) => {

    const { pages } = useContext(ActivePageSetActivePageContext);
    const  Link  = useContext(AsyncRequestLinkContext);

    const [projectDescription, setProjectDescription] = useState('');

    const svgArrayRef = React.createRef();

    const saveProject = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.cancellable = true;

        const svgArray = [];
        svgArrayRef.current.childNodes.forEach((item) => {
            /* firstChild is the div svg is enclosed in */
            svgArray.push(item.firstChild.innerHTML);
        });

        axios.post(`${Link}/projects`, {
            projectName:currentRoom.replace('room-',''),
            projectDescription:projectDescription,
            projectMembers: [userList],
            projectData: svgArray
        }).then(res => {
            alert('sucessful');
            console.log(res.data);
        }).catch(err => {
            alert('something went wrong');
            console.log(err);
        })
    }

    return (
        <div className='saveProjectContainer'>
            <div className='projectPreview' ref={svgArrayRef}>
                {
                    pages.map((item, index) => <Page preview cantDelete {...item} key={index} />)
                }
            </div>
            <div className='projectSubmitForm'>
                <form id='projectSubmissionForm'>
                    <textarea
                        placeholder='enter brief description of project'
                        value={projectDescription}
                        onChange={e => setProjectDescription(e.target.value)}
                        id='projectDescription'
                        cols='30'
                        rows='5'
                    />
                    <CustomButton
                        content='save'
                        clickHandler={saveProject}
                        size='small'
                    />
                </form>
            </div>
        </div>
    );
}

export default SaveProject;

