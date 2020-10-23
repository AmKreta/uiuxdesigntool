import React, { useContext } from 'react';

import './pages.styles.scss';
import Page from './page/page.component';

import { MdAddBox } from 'react-icons/md';
import { IconContext } from 'react-icons';

import ActivePageSetActivePgeContext from '../../activePageSetActivePageContext.component';

const Pages = () => {

    const {
        activeProjectPage,
        setActiveProjectPage,
        addPage,
        pages  /* activeColor,activeTool,activeElement,elements*/
    } = useContext(ActivePageSetActivePgeContext);

    const scrollRef = React.createRef();

    const scrollHorizontally = (e) => {
        scrollRef.current.scrollLeft += (e.deltaY * 10);
        console.log('amk');
    }

    return (
        <div className='pages'>
            <div className="pageCollection" onWheel={scrollHorizontally} ref={scrollRef}>
                {
                    pages.map((item, index) => {
                        return <Page
                            {...item}
                            key={index}
                            clickHandler={(e) => {
                                setActiveProjectPage(index);
                            }}
                            isActive={index === activeProjectPage ? true : false}
                        />
                    })
                }
            </div>
            <div className='AddPages'>
                <IconContext.Provider value={{ className: 'addPage' }}>
                    <MdAddBox
                        title='add pages'
                        onClick={(e) => { addPage() }}
                    />
                </IconContext.Provider>
            </div>
        </div>
    );
}

export default Pages;