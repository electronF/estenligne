import { Component } from 'react';
import { getFileSize } from '../utils/functions';

import trash from "./../../../wwwroot/images/trash_white.png"
import video from  "./../../../wwwroot/images/video.png";
import photo from "./../../../wwwroot/images/camera_p.png";

import "./CapturedItem.css";

export default class CapturedItem extends Component {
    props:any = this.props
    state = {

    }

    displayMedia = (event:any) =>
    {
        try {
            this.props.displayMedia()
        } catch (error) {}
    }

    removeItem = (event:any) =>
    {
        try {
            this.props.removeItem()
        } catch (error) {}
    }

    render() {
        //video-08102021.mp4
        var {fileName, fileSrc, fileSize, fileType} = this.props
        fileType = `${fileType}`
        var arr = `${fileName}`.split("/")
        var name = arr[arr.length-1]
        var dotPosition = name.lastIndexOf(".")
        var ext = ""
        if(dotPosition > -1)
            ext = name.substring(dotPosition + 1)
        return (
            <div className="media-item">
                <div className="media-item-miniature" onClick = {this.displayMedia}>
                    <img src={(fileType.toLowerCase() === 'video')?video:photo} alt={`${fileType}-icon`} />
                    <img src={fileSrc} alt="miniature" />
                </div>
                <div className="media-item-information">
                    <div>
                        <span>{name}</span>
                    </div> 
                    <div>
                        <span>{ext.toUpperCase()}</span>
                        <span>{fileType} - {getFileSize(fileSize)}</span>
                    </div>
                </div>
                <div className="media-item-delete" onClick = {this.removeItem}>
                    <img src={trash} alt="trash" />
                </div>
            </div>
        )
    }
}
