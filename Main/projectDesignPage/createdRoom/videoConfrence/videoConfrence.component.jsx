import React, { useEffect, useContext, useState } from 'react';
import './videoConfrence.styles.scss';


class VideoElement extends React.Component {
    constructor(props) {
        /* Id, projectDesignSocket */
        super();
        this.state = { hasError: false };
        this.videoRef = React.createRef();
        this.mediaSource = null;
        this.sourceBuffer = null;
    }

    componentDidMount() {
        this.mediaSource = new MediaSource();
        this.videoRef.current.src = URL.createObjectURL(this.mediaSource);
        this.mediaSource.onsourceopen = (e) => {
            URL.revokeObjectURL(this.videoRef.current.src);
            this.sourceBuffer = this.mediaSource.addSourceBuffer("video/webm; codecs=\"vp8, opus\"");
            this.sourceBuffer.mode = 'sequence';
            this.props.projectDesignSocket.on(`${this.props.Id}VideoData`, ({ blob }) => {
                try {
                    this.sourceBuffer.appendBuffer(blob);
                }
                catch (err) {
                    console.log(err);
                }
                finally {
                    console.log(this.sourceBuffer);
                }
            });
        }
    }

    render() {
        if (this.state.hasError) {
            return <h1>error</h1>;
        }
        else {
            return <video autoPlay ref={this.videoRef} id={this.props.Id}></video>;
        }
    }

    componentWillUnmount() {
        this.mediaSource.onsourceopen = null;
        this.props.projectDesignSocket.off(`${this.props.Id}VideoData`);
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.log(error, info);
    }
}

class VideoConfrence extends React.Component {
    /* projectDesignSocket, isAdmin, userList, currentRoom, userName, userId */
    constructor(props) {
        super();
        this.state = {};
        this.userVideoRef = React.createRef();
        this.mediaRecorder = null;
        this.videoStream = null;
    }

    static getDerivedStateFromProps(nextProp, prevState) {
        if (nextProp.userList !== prevState.userList) {
            return { userList: nextProp.userList }
        }
        else {
            return {};
        }
    }

    componentDidMount() {
        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        }).then(stream => {
            this.videoStream = stream;
            this.userVideoRef.current.srcObject = stream;
            this.mediaRecorder = new MediaRecorder(stream);
            this.mediaRecorder.start(1000);
            this.mediaRecorder.ondataavailable = (e) => {
                if (e.data.size) {
                    this.props.projectDesignSocket.emit('video', {
                        room: this.props.currentRoom,
                        data: { userId: this.props.userId, blob: e.data }
                    });
                    this.mediaRecorder.stop();
                }
            }
            this.mediaRecorder.onstop = () => { 
                this.mediaRecorder.start(1000);
            }
        }).catch(err => {
            console.log(err);
        });
    }


    render() {
        return (
            <div className='videoConfrencing'>
                <video autoPlay ref={this.userVideoRef} />
                {
                    this.state.userList.map((item, index) => {
                        if (item !== this.props.userId) {
                            return <VideoElement key={index} Id={item} projectDesignSocket={this.props.projectDesignSocket} />
                        }
                        else {
                            return null;
                        }
                    })
                }
            </div>
        );
    }

    componentWillUnmount() {
        this.videoStream.getTracks().forEach(function (track) {
            track.stop();
        });
        this.mediaRecorder.ondataavailable = null;
        this.props.projectDesignSocket.off('newMemberAdded');
        this.mediaRecorder.onstop = null;
    }
}

export default VideoConfrence;

