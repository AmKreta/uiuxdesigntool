import React from 'react';
import './page.styles.scss';
const Page = (props) => {
    /* activeElement,activeTool,activeColor,elements,clickHandler */

    return (
        <div className='pageContainer'>
            <svg className={`page ${props.isActive?'activeProjectPage':null}`} onClick={props.clickHandler} viewBox='0 0 807 370' >
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
        </div>
    );
}

export default Page;