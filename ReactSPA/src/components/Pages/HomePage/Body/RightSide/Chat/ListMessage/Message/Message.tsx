import { Component } from "react";

import isWaiting from "./../../../../../../../../wwwroot/images/important_2.png"
import tickDark from "./../../../../../../../../wwwroot/images/tick_dark.png"
import doubleTickReceived from "./../../../../../../../../wwwroot/images/double_tick_dark_1.png"
import doubleTickRead from "./../../../../../../../../wwwroot/images/double_tick_blue_2.png"

import TaggedMessage from '../../../../../../../shared/taggedMessage/TaggedMessage';
import TransferedMessage from '../../../../../../../shared/TransferedMessage/TransferedMessage';

import "./Message.css"
import FileDisplayer from "../../../../../../../shared/filedisplayer/FileDisplayer";

class Message extends Component{
    props:any = this.props

    messageOptionsAreDisplayed = false

    onShowHideMessageOption = (event:React.MouseEvent<HTMLSpanElement, MouseEvent>) => 
    {
        var div = event.currentTarget.nextElementSibling as HTMLDivElement
        this.messageOptionsAreDisplayed = !this.messageOptionsAreDisplayed
        if(this.messageOptionsAreDisplayed === true)
            div.style.setProperty("display", "none")
        else
            div.style.setProperty("display", "flex")
    }

    onShow = (event:React.FocusEvent<HTMLSpanElement>) => 
    {
        var div = event.currentTarget.nextElementSibling as HTMLDivElement
        div.style.setProperty("display", "flex")
    }

    onHide = (event:React.SyntheticEvent<HTMLSpanElement, Event>) => 
    {
        var div = event.currentTarget.nextElementSibling as HTMLDivElement
        div.style.setProperty("display", "none")
    }


    render(){
        var {
            type, isIncomingMessage, 
            isTransfered, isTagged, 
            taggetMessageData, message, 
            time, status, 
            onTaggedMessage, onEnableDeletion, 
            onShareMessage, file} = this.props
        
        return (
            <div className ={`prev-message ${(isIncomingMessage===true)?"incoming-message":"outgoing-message"}`}>
                <div> 
                    <span onClick = {(event)=> this.onShowHideMessageOption(event)} onBlur={(event)=> this.onHide(event)}>...</span>
                    <div className="prev-message-option">
                        <span onClick = {onTaggedMessage}> Reply </span>
                        <span onClick = {onEnableDeletion}> Delete </span>
                        <span onClick = {onShareMessage}> Shared </span>
                    </div>
                </div>
                <div>
                    <div className="prev-message-content">
                    {((isTransfered===true)?
                        (<TransferedMessage message={"This is the shared message"} />):
                        ((isTagged === true)?
                        (<TaggedMessage />):null))}
                        {(isTransfered !== true && type === "file")?<FileDisplayer size={file.size} fileSrc={file.src} name = {file.name}/>:null}
                        {(isTransfered !== true && message.length > 0)?<span className={(isIncomingMessage===true)?"incoming-message-text":"outgoing-message-text"}>{message}</span>:null}
                    </div>
                    <div className="sending-information">
                        {
                            (isIncomingMessage === true)?null:<span className="send-image">
                            <img src={outGoingsendImage(status)} alt="" />
                            </span>
                        }
                        <span className="send-datetime">{time}</span>
                    </div>
                    {/* <div className="failed-sending">
                        {
                            (isIncomingMessage === true)?null:<span className="failed-sending-image">
                            <img src={important2} alt="" />
                            </span>
                        }
                    </div> */}
                </div>
            </div>
        )
    }
}

export default Message

function outGoingsendImage(status:string) {
        switch (status) {
            case "send":
                return tickDark;
            case "received":
                return doubleTickReceived
            case "read":
                return doubleTickRead
            default:
                return isWaiting;
    };
}
