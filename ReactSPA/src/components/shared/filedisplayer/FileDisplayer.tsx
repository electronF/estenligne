import { Component } from 'react'
import { getFileSize, getMediaType } from '../utils/functions'

import "./FileDisplayer.css"

class FileDisplayer extends Component {
    props:any = this.props
    state = {
        mediaIsPlaying: false,
        mediaIsDownloaded: false
    }

    render() {    
        
        var {name, size, fileSrc} = this.props
        var mediaTypeExt = getMediaType(name)
        var [mediaType, ext]  = mediaTypeExt.split("/")
        var root = "./../../../wwwroot/"

        fileSrc = root+((mediaType === "application")?"documents":mediaType+"s")+"/"+name
        //qq require("./../../../wwwroot/videos/GRIMMS1EP5.mp4")?.default
        var file:any = {
            "video":<video typeof={mediaTypeExt} preload="auto" controls> <source  type={mediaTypeExt} src={""}  /></video>, 
            "audio":<audio src={fileSrc} controls></audio>,
            "image": <img src= {fileSrc} alt="failed to load" />, 
            "application":<embed src= {fileSrc} ></embed>, 
            "unknow": <div className="unknow-file"><span>{`.${ext}`}</span><span>{name}</span></div>
        }    // frameBorder={0}
        
        var media = file[mediaType]
        media = (media === undefined)?null:media
        return (
            <div className="file-displayer">
                {media}
                <div className = "file-description">
                    <span >{ext.toLocaleUpperCase()}</span>
                    <span>{getFileSize(size)}</span>
                </div>
                
            </div>
        )
    }
}

export default  FileDisplayer