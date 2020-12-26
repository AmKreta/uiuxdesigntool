import React from 'react';

import { BiCircle, BiRectangle, BiPolygon, BiText, BiPaintRoll } from 'react-icons/bi';
import { FaDrawPolygon as PolylineIcon, FaExpandArrowsAlt } from 'react-icons/fa';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { IconContext } from 'react-icons';


const ToolBarA = ({ setActiveTool, activeTool, activeColor }) => {

    const clickHandler = (e) => {
        setActiveTool(e.target.parentElement.id);
        /* function defined in uiUxDesign.Component */
    }


    return (
        <div className='toolBarA' >
            <div id='circle' title='circle' onClick={clickHandler}>
                <IconContext.Provider value={{ className: `tool ${activeTool === 'circle' ? 'activeTool' : null}` }}>
                    <BiCircle title='circle' />
                </IconContext.Provider>
            </div>

            <div id='rectangle' title='rectangle' onClick={clickHandler}>
                <IconContext.Provider value={{ className: `tool ${activeTool === 'rectangle' ? 'activeTool' : null}` }}>
                    <BiRectangle title='rectangle' />
                </IconContext.Provider>
            </div>

            <div id='polygon' title='polygon' onClick={clickHandler}>
                <IconContext.Provider value={{ className: `tool ${activeTool === 'polygon' ? 'activeTool' : null}` }}>
                    <BiPolygon title='polygon' />
                </IconContext.Provider>
            </div>

            <div id='ellipse' title='ellipse' onClick={clickHandler}>
                <IconContext.Provider value={{ className: `tool ellipse ${activeTool === 'ellipse' ? 'activeTool' : null}` }}>
                    <BiCircle title='ellipse' />
                </IconContext.Provider>
            </div>

            <div id='polyline' title='polyline' onClick={clickHandler}>
                <IconContext.Provider value={{ className: `tool ${activeTool === 'polyline' ? 'activeTool' : null}` }}>
                    <PolylineIcon title='polyline' />
                </IconContext.Provider>
            </div>

            <div id='line' title='line' onClick={clickHandler} >
                <IconContext.Provider value={{ className: `tool line ${activeTool === 'line' ? 'activeTool' : null}` }}>
                    <HiOutlineArrowNarrowRight title='line' />
                </IconContext.Provider>
            </div>

            <div id='text' title='text' onClick={clickHandler}>
                <IconContext.Provider value={{ className: `tool ${activeTool === 'text' ? 'activeTool' : null}` }}>
                    <BiText title='text' />
                </IconContext.Provider>
            </div>

            <div id='paint' title='paint' onClick={clickHandler}>
                <IconContext.Provider value={{ className: `tool ${activeTool === 'paint' ? 'activeTool' : null}` }}>
                    <BiPaintRoll title='paint' />
                </IconContext.Provider>
            </div>


            <div id='pan' title='pan' onClick={clickHandler}>
                <IconContext.Provider value={{ className: `tool ${activeTool === 'pan' ? 'activeTool' : null}` }}>
                    <FaExpandArrowsAlt title='pan' />
                </IconContext.Provider>
            </div>

            <div className='activeColor tool' style={{ backgroundColor: 'white' }} title='active color' >
                <div style={{ backgroundColor: activeColor, height: '100%', width: '100%' }} />
            </div>
        </div>
    );
}

export default ToolBarA;