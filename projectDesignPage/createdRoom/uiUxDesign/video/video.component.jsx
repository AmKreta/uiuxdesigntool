import React from 'react';
import './video.styles.scss';
class Video extends React.Component {
    constructor(props) {
        /* projectDesignSocket,isAdmin,userList,currentRoom */
        super();
        this.state = {data:null};
        this.svgRenderRef = React.createRef();
    }
    componentDidMount() { 
        this.props.projectDesignSocket.on('draw', (function (data){
            this.setState({ data: data }, () => { 
                this.svgRenderRef.current.innerHTML = data;
            });
            console.log(data);
        }).bind(this));
    }
    render() {
        return (
            <svg className='canvasDisplay' ref={this.svgRenderRef} />
        );    
    }
    componentWillUnmount() { 
        this.props.projectDesignSocket.off('draw');
    }
} 

export default Video;