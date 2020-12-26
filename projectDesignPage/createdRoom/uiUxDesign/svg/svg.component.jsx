import React, { useEffect } from 'react';
import './svg.styles.scss';

const SVG = (props) => {

    const {
        activeTool,
        activeColor,
        activeElement,
        elements,
        pushPointsToPointsArray,
        clearPointsArray,
        pushElementsToPage,
        pointsArray,
        setActiveElement,
        editActiveElement,
        activePage,
        deleteElement,
        projectDesignSocket,
        currentRoom
    } = props;

    const svgStreamRef = React.createRef();
    var captureInterval = null;

    useEffect(() => {
        if (svgStreamRef.current) {
            console.log(svgStreamRef.current);
            projectDesignSocket.emit('drawing', { room: currentRoom, data: svgStreamRef.current.innerHTML });
        }
        else {
            console.log('svgStreamRef.current is null');
        }
        return () => {
            if (captureInterval) {
                clearInterval(captureInterval);
            }
        }
    }, [svgStreamRef, elements]);
    /* base class for shapes */

    /*
        l-shift 16  translate
        l-ctrl  17  rotate
        l-alt   18  scale
    */

    function svgElement(stroke = 'black', strokeWidth = '1px', fill = 'white', opacity = '1.0', fillRule = null, transform = null) {
        this.stroke = stroke;
        this.strokeWidth = strokeWidth;
        this.fill = fill;
        this.opacity = opacity;
        this.fillRule = fillRule;
        this.transform = {
            translate: [0, 0],
            rotate: [0, 0],
            scale: [1, 1]
        };

        this.style = () => {
            return ({
                stroke: this.stroke,
                strokeWidth: this.strokeWidth,
                fill: this.fill,
                opacity: this.opacity,
                fillRule: this.fillRule,
                scale: `${this.transform.scale[0]} ${this.transform.scale[1]}`,
                rotate: `${this.transform.rotate[0]} ${this.transform.rotate[1]}`
            });
        }

        this.onMouseDown = (e) => {
            e.cancelBubble = true;
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            e.persist();

            if (e.button === 0) {

                setActiveElement(e.target.id);

                let x = e.clientX;
                let y = e.clientY;

                if (e.target.parentElement.getAttribute('activetool') !== 'paint') {

                    e.target.onmousemove = (E) => {
                        let x1 = E.clientX;
                        let y1 = E.clientY;
                        editActiveElement({
                            action: 'transform',
                            payload: {
                                elementId: E.target.id,
                                dx: x1 - x,
                                dy: y1 - y,
                            }
                        });
                        x = x1;
                        y = y1;
                    }
                }
                else if (e.target.parentElement.getAttribute('activetool') === 'paint') {
                    console.log('change color');
                    editActiveElement({
                        action: 'fill',
                        payload: {
                            elementId: e.target.id,
                            color: activeColor
                        }
                    });
                }
            }
        }

        this.onMouseUp = (e) => {
            e.cancelBubble = true;
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            e.target.onmousemove = null;
        }

        this.onMouseOut = (e) => {
            e.cancelBubble = true;
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            e.target.onmousemove = null;
            editActiveElement({
                action: 'opacity',
                payload: {
                    elementId: e.target.id,
                    opacity: 1
                }
            });
        }

        this.onMouseOver = (e) => {
            e.cancelBubble = true;
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            e.preventDefault();
            editActiveElement({
                action: 'opacity',
                payload: {
                    elementId: e.target.id,
                    opacity: 0.6
                }
            });
        }

        this.onContextMenu = (e) => {
            deleteElement(e.target.id);
        }
    }

    /* class for circle */

    function Circle(posX, posY, r, stroke, strokeWidth, fill, opacity, fillRule, transform) {
        svgElement.call(this, stroke, strokeWidth, fill, opacity, fillRule, transform);
        this.posX = posX;
        this.posY = posY;
        this.r = r;
        this.render = (id) => (
            <circle
                cx={this.posX}
                cy={this.posY}
                r={this.r}
                style={this.style()}
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
                onMouseOut={this.onMouseOut}
                onMouseOver={this.onMouseOver}
                onContextMenu={this.onContextMenu}
                key={id}
                id={id}
            />
        );
        this.renderRaw = (id) => (
            <circle
                cx={this.posX}
                cy={this.posY}
                r={this.r}
                style={this.style()}
                key={id}
                id={id}
            />
        );
    }

    /* class for Rectangle */

    function Rectangle(posX, posY, height, width, stroke, strokeWidth, fill, opacity, fillRule, transform) {
        svgElement.call(this, stroke, strokeWidth, fill, opacity, fillRule, transform);
        this.posX = posX;
        this.posY = posY;
        this.height = height;
        this.width = width;
        this.render = (id) => (
            <rect
                x={this.posX}
                y={this.posY}
                width={this.width}
                height={this.height}
                style={this.style()}
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
                onMouseOut={this.onMouseOut}
                onMouseOver={this.onMouseOver}
                onContextMenu={this.onContextMenu}
                key={id}
                id={id}
            />
        );
        this.renderRaw = (id) => (
            <rect
                x={this.posX}
                y={this.posY}
                width={this.width}
                height={this.height}
                style={this.style()}
                key={id}
            />
        );
    }

    /* class for Ellipse */

    function Ellipse(posX, posY, rX, rY, stroke, strokeWidth, fill, opacity, fillRule, transform) {
        svgElement.call(this, stroke, strokeWidth, fill, opacity, fillRule, transform);
        this.posX = posX;
        this.posY = posY;
        this.rX = rX;
        this.rY = rY;
        this.render = (id) => (
            <ellipse
                cx={this.posX}
                cy={this.posY}
                rx={this.rX}
                ry={this.rY}
                style={this.style()}
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
                onMouseOut={this.onMouseOut}
                onMouseOver={this.onMouseOver}
                onContextMenu={this.onContextMenu}
                key={id}
                id={id}
            />
        );
        this.renderRaw = (id) => (
            <ellipse
                cx={this.posX}
                cy={this.posY}
                rx={this.rX}
                ry={this.rY}
                style={this.style()}
                key={id}
            />
        );
    }

    /* class for Line */

    function Line(x1, y1, x2, y2, stroke, strokeWidth, fill, opacity, fillRule, transform) {
        svgElement.call(this, stroke, strokeWidth, fill, opacity, fillRule, transform);
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        this.render = (id) => (
            <line
                x1={this.x1}
                y1={this.y1}
                x2={this.x2}
                y2={this.y2}
                style={this.style()}
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
                onMouseOut={this.onMouseOut}
                onMouseOver={this.onMouseOver}
                onContextMenu={this.onContextMenu}
                key={id}
                id={id}
            />
        );
        this.renderRaw = (id) => (
            <line
                x1={this.x1}
                y1={this.y1}
                x2={this.x2}
                y2={this.y2}
                style={this.style()}
                key={id}
            />
        );
    }

    /* class for Polygon */

    function Polygon(points, stroke, strokeWidth, fill, opacity, fillRule, transform) {
        /* points in form [[],[],[],[]] */
        svgElement.call(this, stroke, strokeWidth, fill, opacity, fillRule, transform);
        this.points = points;
        this.render = (id) => (
            <polygon
                points={this.points.reduce((a, b) => {
                    return a + b.toString() + ' ';
                }, '')}
                style={this.style()}
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
                onMouseOut={this.onMouseOut}
                onMouseOver={this.onMouseOver}
                onContextMenu={this.onContextMenu}
                key={id}
                id={id}
            />
        );
        this.renderRaw = (id) => (
            <polygon
                points={this.points.reduce((a, b) => {
                    return a + b.toString() + ' ';
                }, '')}
                style={this.style()}
                key={id}
            />
        );
    }

    /* class for polyline */

    function Polyline(points, stroke, strokeWidth, fill, opacity, fillRule, transform) {
        svgElement.call(this, stroke, strokeWidth, fill, opacity, fillRule, transform);
        this.points = points;
        this.render = (id) => (
            <polyline
                points={this.points.reduce((a, b) => {
                    return a + b.toString() + ' ';
                }, '')}
                style={this.style()}
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
                onMouseOut={this.onMouseOut}
                onMouseOver={this.onMouseOver}
                onContextMenu={this.onContextMenu}
                key={id}
                id={id}
            />
        );
        this.renderRaw = (id) => (
            <polyline
                points={this.points.reduce((a, b) => {
                    return a + b.toString() + ' ';
                }, '')}
                style={this.style()}
                key={id}
            />
        );
    }

    /* class for text */

    function Text(posX, posY, Text, stroke, strokeWidth, fill, opacity, fillRule, transform) {
        svgElement.call(this, stroke, strokeWidth, fill, opacity, fillRule, transform);
        this.posX = posX;
        this.posY = posY;
        this.Text = Text;
        this.render = (id) => (
            <text
                x={this.posX}
                y={this.posY}
                style={this.style()}
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
                onMouseOut={this.onMouseOut}
                onMouseOver={this.onMouseOver}
                onContextMenu={this.onContextMenu}
                key={id}
                id={id}
            >
                {this.Text}
            </text>
        );
        this.renderRaw = (id) => (
            <text
                x={this.posX}
                y={this.posY}
                style={this.style()}
                key={id}
            >
                {this.Text}
            </text>
        );
    }

    const createElement = (activeTool, points) => {
        /*
            points is in form [x,y] for text,circle,rect,ellipse
            points is in form [[x1,y1],[x2,y2]...] for line ,polygon and polyline
        */
        switch (activeTool) {
            case 'circle':
                return new Circle(points[0], points[1], 20);
            case 'rectangle':
                return new Rectangle(points[0], points[1], 20, 20);
            case 'ellipse':
                return new Ellipse(points[0], points[1], 30, 20);
            case 'polygon':
                return new Polygon(points);
            case 'polyline':
                return new Polyline(points);
            case 'line':
                console.log(points);
                return new Line(points[0][0], points[0][1], points[1][0], points[1][1]);
            case 'text':
                return new Text(points[0], points[1], 'text');
        }
    }

    function makeId(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const onMouseDown = (e) => {

        e.preventDefault();

        if (e.stopPropagation) {
            e.stopPropagation();
        }

        if (e.button === 0) {
            let x = e.clientX;
            let y = e.clientY;

            let Target = e.target;

            let E = e.target.getBoundingClientRect();

            if (activeTool && activeTool !== 'paint') {
                /*
                    create Element takes activeTool,pointsArray as argument
                */
                if (activeTool === 'circle' || activeTool === 'rectangle' || activeTool === 'ellipse' || activeTool === 'text') {
                    pushElementsToPage({
                        id: makeId(20),
                        element: createElement(activeTool, [x - E.x, y - E.y])
                    });
                }
                else if (activeTool === 'line') {
                    /* pointsArray(x,y) will save in form [[],[],[]] */
                    pushPointsToPointsArray(x - E.x, y - E.y, (points) => {
                        /*
                            points is pointArray used in callback of setState to get exact no of points
                        */
                        if (points.length === 2) {
                            pushElementsToPage({
                                id: makeId(20),
                                element: createElement(activeTool, points)
                            });
                            clearPointsArray();
                        }
                    });

                }
                else if (activeTool === 'polygon' || activeTool === 'polyline') {
                    pushPointsToPointsArray(x - E.x, y - E.y, (points) => {
                        /*
                            points is pointArray used in callback of setState to get exact no of points
                        */
                        Target.oncontextmenu = (event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            pushElementsToPage({
                                id: makeId(20),
                                element: createElement(activeTool, points)
                            });
                            clearPointsArray();
                        }

                    });
                }
            }
            else if (activeTool === 'paint') {
                console.log('paint');
            }
        }
    }

    const onMouseUp = (e) => {
        console.log('onMouseUp');
        e.target.onmousemove = null;
        e.target.oncontextmenu = null;
    }

    const onContextMenu = (e) => {
        e.preventDefault();
    }

    return (
        <svg id={activePage} className='canvas' onMouseDown={onMouseDown} onMouseUp={onMouseUp} onContextMenu={onContextMenu} activetool={activeTool} ref={svgStreamRef}>
            {
                (() => {
                    var a = [];
                    /*
                        elements is in form Map(id=>object)
                        object has a function render(key) which returns <elem key={key} />
                    */
                    for (let x of elements) {
                        a.push(x[1].render(x[0]));
                    }
                    return a.length ? a : null;
                })()
            }
            {
                pointsArray.length
                    ? pointsArray.map((item, index) => {
                        return (
                            <circle
                                cx={item[0]}
                                cy={item[1]}
                                r='2'
                                style={{ fill: 'black', stroke: 'red', strokeWidth: '1' }}
                                key={index}
                            />
                        );

                    })
                    : null
            }
        </svg>
    );
}

export default SVG;