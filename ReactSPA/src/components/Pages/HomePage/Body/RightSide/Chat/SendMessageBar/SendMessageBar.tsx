import { Component, FormEvent } from 'react';
 
import smiley from "./../../../../../../../wwwroot/images/smiley.png";
import smileyDark from "./../../../../../../../wwwroot/images/smiley_dark.png";
import microphone from "./../../../../../../../wwwroot/images/microphone.png";
import microphoneDark from "./../../../../../../../wwwroot/images/microphone_dark.png";
import sendWhite1 from "./../../../../../../../wwwroot/images/send_white.png";
import sendWhite2 from "./../../../../../../../wwwroot/images/send_white_d.png";
import sendDark from "./../../../../../../../wwwroot/images/send_dark.png";
import trashWhite from "./../../../../../../../wwwroot/images/trash_white.png";
import trashDark from "./../../../../../../../wwwroot/images/trash_dark.png";
import attachWhite from "./../../../../../../../wwwroot/images/attach.png";
import attachDark from "./../../../../../../../wwwroot/images/attach_dark.png";
import stop from "./../../../../../../../wwwroot/images/stop.png";
import close from "./../../../../../../../wwwroot/images/delete.png";
import video from "./../../../../../../../wwwroot/images/video_dark_1.png";
import camera from "./../../../../../../../wwwroot/images/camera.png";
import photo from "./../../../../../../../wwwroot/images/camera_dark.png";

import TaggedMessage from '../../../../../../shared/taggedMessage/TaggedMessage';

import "./SendMessageBar.css"


class SendMessageBar extends Component{
    props:any = this.props
    state = {
        message: "",
        addFileIsOpen: false,
        addEmojiIsOpen: false,
        microphoneIsRecord: false,
        recordMustBeDeleted: false,
        messageDescriptionIsShowed: true,
        cameraOptionIsOpen: false
    }
    onAddMessageText = (event:FormEvent) =>{
        event.preventDefault()
        this.setState({message:""})
        this.props.onSendMessage(this.state.message, "", this.props.name, this.props.category)
    }

    onChange = (event:any) =>{
        this.setState({message:event.currentTarget.value})
    } 

    onSelectFile = (event:any) => {
        var input = document.createElement("input")
        input.setAttribute("type", "file")
        input.click()

        input.onload = (event) => {
            console.log(event, input.files?.item(0), "okey1")
        }

        input.onchange = (event) =>{
            console.log(input.files?.item(0), 'file')
        }

        let file:any = null
        //Open selector here
        // this.props.onSendMessage("", file, this.props.name, this.props.category)
    }

    takeVideo = (event:any) =>
    {

    }

    takePhoto = (event:any) =>
    {

    }

    onSelectEmoji = (event:any) => {
        console.log("select emoji")
    }

    onRecordMicrophone = (event:any) => {
        console.log("record")
    }

    onCloseButtonPress = (event:any) =>
    {
        this.setState({messageDescriptionIsShowed:false})
    }

    onOpenOption = (event:any) =>{
        // var cameraOptionIsOpen = !this.state.cameraOptionIsOpen
        // this.setState({cameraOptionIsOpen})
        var displayMediaZone = document.getElementById("display-media-box")
        displayMediaZone?.style.setProperty("display", "flex")
    }   

    render(){
        return (
            <div className = "send-message-bar">
                {(this.state.messageDescriptionIsShowed)?<div className="description-bar">
                    <TaggedMessage />
                    <img src={close} onClick = {this.onCloseButtonPress} alt="" />
                </div>:null}
                <div className = "sending-bar">
                    <div className="message-camera"> 
                        {(this.state.cameraOptionIsOpen)?<div className="camera-list-option">
                            <div className="camera-option" onClick = {this.takePhoto}>
                                <img src={photo} alt="pic" />
                                <span>Take photo</span>
                            </div>
                            <div className="camera-option" onClick = {this.takeVideo}>
                                <img src={video} alt="video" />
                                <span>Take video</span>
                            </div>
                        </div>:null}
                        <img src={camera} alt="" onClick = {this.onOpenOption} /> 
                    </div>
                    <div className="message-smiley"> <img src={smiley} alt="" onClick = {this.onSelectEmoji} /> </div>
                    <div className = "message-form"> 
                        <textarea placeholder="Write new message" value={this.state.message} onChange = {this.onChange} required/>
                        <button type="submit" onClick={this.onAddMessageText}><img src={sendWhite1} alt="" /></button>
                    </div>
                    <div className = "message-attach-files"> <img src={attachWhite} onClick = {this.onSelectFile} alt="" /> </div>
                    <div className = "message-record"> <img src={microphone} alt="" onClick = {this.onRecordMicrophone} /> </div>    
                </div>
            </div>
        )
    }
}

export default SendMessageBar