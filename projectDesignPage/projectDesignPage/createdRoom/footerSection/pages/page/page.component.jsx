import React, { useContext } from 'react';

import './page.styles.scss';

import { GrClose } from 'react-icons/gr';
import { IconContext } from 'react-icons';

import ActivePageSetActivePgeContext from '../../../activePageSetActivePageContext.component';

const Page = (props) => {
    /* activeElement,activeTool,activeColor,elements,clickHandler ,isActive,index,isAdmin*/

    const { deletePage } = useContext(ActivePageSetActivePgeContext);

    return (
        <div className={`pageContainer ${props.preview ? 'preview' : null}`}>
            <svg className={`page ${props.isActive ? 'activeProjectPage' : null}`} onClick={props.clickHandler} viewBox='0 0 807 370' >
                {
                    (() => {
                        var a = [];
                        /*
                            elements is in form Map(id=>object)
                            object has a function render(key) which returns <elem key={key} />
                        */
                        for (let x of props.elements) {
                            a.push(x[1].renderRaw(x[0]));
                        }
                        return a.length ? a : null;
                    })()
                }
            </svg>
            {
                props.isAdmin
                    ? <IconContext.Provider value={{ className: 'closingIcon' }}>
                        <GrClose
                            title='delete this page'
                            onClick={(e) => { deletePage(props.index) }}
                        />
                    </IconContext.Provider>
                    : null
            }
        </div>
    );
}

export default Page;