import React from 'react';
import ReactPlayer from 'react-player/youtube';

export default function VideoPlayer(props) {

    const videoID = props.location.props.video_id

    return (
        <div>
            <ReactPlayer url={`http://www.youtube.com/watch?v=${videoID}`} />
        </div>
    )
}
