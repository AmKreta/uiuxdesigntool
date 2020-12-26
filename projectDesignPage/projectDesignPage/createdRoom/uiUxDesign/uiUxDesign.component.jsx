import React from 'react';

import './uiUxDesign.styles.scss';
import SVG from './svg/svg.component';
import Video from './video/video.component';
import ToolBarA from './toolBarA.component';
import ToolBarB from './toolBarB.component';

import ActiveELementInfoContext from './activeElementInfoContext';
import ActiveColorContext from './activeColorContext';

/* class for Page */
function Page() {
    this.activeTool = 'pan';
    this.activeColor = 'rgb(0,0,0)';
    this.activeElement = null;
    this.elements = new Map();
}

/* ES6 class  */

class UiUxDesign extends React.Component {
    constructor(props) {
        /* projectDesignSocket,isAdmin,userList,currentRoom ,setFooterPagesProp*/
        super();
        this.state = {
            page: [new Page()],
            activePage: 0,
            activeKey: null,
            pointsArray: []
        };
    }

    addNewPage = () => {
        this.setState(prevState => {
            return ({
                page: [...prevState.page, new Page()]
            });
        });
    }

    deletePage = (index) => {

        let PAGE = this.state.page;
        PAGE.splice(index, 1);

        let activePage = this.state.activePage;

        if (index <= this.state.activePage) {
            /*  
                deleting from left side of active page 
                activePage will decreade by one because of left shifting 
            */
            if (PAGE.length === 1) {
                /* ie starting and only one element and activePage will remain 0*/
                PAGE.push(new Page());
            }
            else {
                activePage -= 1;
            }    
        }
        else if (index > this.state.activePage) {
            /* 
                deleting from right side of active page 
                active page will remain same
            */
        }
        this.setState({ page: PAGE, activePage: activePage });
    }

    setActivePage = (pageNo) => {
        this.setState({ activePage: pageNo });
    }

    setActiveColor = (rgbaString) => {
        console.log(rgbaString);
        let PAGE = this.state.page;
        PAGE[this.state.activePage].activeColor = rgbaString;
        this.setState({ page: PAGE });
    }

    setActiveElement = (elementId) => {
        let PAGE = this.state.page;
        PAGE[this.state.activePage].activeElement = elementId;
        this.setState({ page: PAGE });
    }

    setActiveTool = (tool) => {
        /* used in toolBar A */
        let PAGE = this.state.page;
        PAGE[this.state.activePage].activeTool = tool;
        this.setState({ page: PAGE });
    }

    pushElementsToPage = ({ id, element }) => {
        let PAGE = this.state.page;
        PAGE[this.state.activePage].elements.set(id, element);
        PAGE[this.state.activePage].activeElement = id;
        this.setState({ page: PAGE });
    }

    pushPointsToPointsArray = (x, y, cb) => {
        this.setState(prevState => ({ pointsArray: [...prevState.pointsArray, [x, y]] }), () => {
            // called in onMouseDown of svg.component
            cb(this.state.pointsArray);
        });
    }

    clearPointsArray = () => {
        this.setState({ pointsArray: [] });
    }

    deleteElement = (elementId) => {
        let PAGE = this.state.page;
        PAGE[this.state.activePage].elements.delete(elementId);
        this.setState({ page: PAGE });
    }

    editActiveElement = ({ action, payload }) => {
        /*
            TRANSLATE:-
            circle,rectangle,text,ellipse has posX,posY so to translate add dx & dy,
            To translate line,polygon,polyline edit theit translate object

            Scale:-
            circle has r simply add dx|| dy to r
            rectangle has height width add dx to width and dy to height
            ellipse add dx to rx and dy to ry
            line,text,polygon,polyline - add scale property
            
            rotate:-
            add rotate property
        */

        let PAGE = this.state.page;
        let activeElement = PAGE[this.state.activePage].elements.get(payload.elementId);
        switch (action) {
            case 'stroke': break;
            case 'strokeWidth': break;
            case 'fill':
                if (activeElement.fill) {
                    activeElement.fill = this.state.page[this.state.activePage].activeColor;
                }
                break;
            case 'opacity':
                if (activeElement.opacity) {
                    activeElement.opacity = payload.opacity;
                }
                break;
            case 'transform':
                switch (this.state.activeKey) {
                    case 16:
                        /*scale */
                        if (activeElement.r) {
                            //circle
                            activeElement.r += Math.max(payload.dx, payload.dy);
                        }
                        else if (activeElement.height && activeElement.width) {
                            //rectangle
                            activeElement.height += payload.dy;
                            activeElement.width += payload.dx;
                        }
                        else if (activeElement.rX && activeElement.rY) {
                            //ellipse
                            activeElement.rX += payload.dx;
                            activeElement.rY += payload.dy;
                        }
                        else if (activeElement.points || activeElement.Text) {
                            //line polygon polyline
                            let scaleX = activeElement.transform.scale[0];
                            let scaleY = activeElement.transform.scale[1];
                            activeElement.transform.scale = [scaleX + payload.dx / 100, scaleY + payload.dy / 100];
                        }
                        break;
                    case 17:
                        /* translate */
                        if (activeElement.posX && activeElement.posY) {
                            //circle rectangle ellipse text 
                            activeElement.posX += payload.dx;
                            activeElement.posY += payload.dy;
                        }
                        else if (activeElement.points) {
                            for (let i in activeElement.points) {
                                activeElement.points[i][0] += payload.dx;
                                activeElement.points[i][1] += payload.dy;
                            }
                        }
                        break;
                    default:
                        console.log('key pressed other than alt ctrl');
                        break;
                }
                break;
        }
        this.setState({ page: PAGE });
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        if (this.state !== prevState) {
            this.props.setFooterPagesProp({
                activeProjectPage: this.state.activePage,
                setActiveProjectPage: this.setActivePage,
                addPage: this.addNewPage,
                pages: this.state.page,
                deletePage: this.deletePage
            });
        }
    }

    componentDidMount() {
        window.onkeydown = (e) => {
            //e.preventDefault();
            e.stopPropagation();
            this.setState({ activeKey: e.keyCode });
        }
        window.onkeyup = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.setState({ activeKey: null });
        }
        this.props.setFooterPagesProp({
            activeProjectPage: this.state.activePage,
            setActiveProjectPage: this.setActivePage,
            addPage: this.addNewPage,
            pages: this.state.page,
            deletePage: this.deletePage
        });
    }

    render() {
        const { currentRoom, isAdmin } = this.props;
        return (
            <div className='uiUxDesign'>
                {
                    isAdmin
                        ? (
                            <ActiveELementInfoContext.Provider value={{
                                elementId: this.state.page[this.state.activePage].activeElement,
                                element: this.state.page[this.state.activePage].elements.get(this.state.page[this.state.activePage].activeElement),
                                editActiveElement: this.editActiveElement
                            }}>
                                {/* used in ./activeElementInfo/activeElementInfo.component */}

                                <ToolBarA setActiveTool={this.setActiveTool} activeTool={this.state.page[this.state.activePage].activeTool} activeColor={this.state.page[this.state.activePage].activeColor} />
                                <div className='drawingTool'>
                                    <SVG
                                        {...this.state.page[this.state.activePage]}
                                        pushElementsToPage={this.pushElementsToPage}
                                        setActiveElement={this.setActiveElement}
                                        editActiveElement={this.editActiveElement}
                                        pushPointsToPointsArray={this.pushPointsToPointsArray}
                                        clearPointsArray={this.clearPointsArray}
                                        pointsArray={this.state.pointsArray}
                                        actarrivePage={this.state.activePage}
                                        deleteElement={this.deleteElement}
                                        projectDesignSocket={this.props.projectDesignSocket}
                                        currentRoom={this.props.currentRoom}
                                    />
                                </div>
                                <ActiveColorContext.Provider value={this.setActiveColor}>
                                    <ToolBarB />
                                </ActiveColorContext.Provider>
                            </ActiveELementInfoContext.Provider>
                        )
                        : (
                            <Video {...this.props} />
                        )
                }
            </div>
        );
    }

    componentWillUnmount() {
        window.onkeydown = null;
        window.onkeyup = null;
    }
}

export default UiUxDesign;