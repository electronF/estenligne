import { Component } from "react";
import Message from "./Message/Message";

import { MessageDTO, FileDTO } from "../../../../../../shared/utils/Types";
import { getMessageTime } from "../../../../../../shared/utils/functions";
import "./ListMessage.css"

class ListMessage extends Component{
    props:any = this.props

    componentDidMount = () => {
        var listMessages:any = document.getElementById("list-message") 
        try {
            new ResizeObserver(
                ()=> listMessages.scrollTop = listMessages?.scrollHeight
            ).observe(listMessages)
        } catch (error) {}
    }
    
    render(){
        var audioFile:FileDTO = {
            id: 1,
            "name": `GRIMMS1EP5.mp4`,
            "size": 170*1024*1024,
            "purpose": 0,
            "dateUploaded": "2021-10-05T22:22:35.093Z",
            "dateDeleted": "2021-10-05T22:22:35.093Z"
        } 
        let messages = this.props.messages.map((data:MessageDTO) => <Message key={"message" + (new Date()).getTime() + Math.random()} category={data.category} 
                                                                type = {(data.file==="" || data.file === null)?"text":"file"}  
                                                                isIncomingMessage = {data.isIncomingMessage}
                                                                message = {data.message} 
                                                                file = {data.file}
                                                                isTransfered = {data.isTransfered}
                                                                isTagged = {data.isTagget}
                                                                taggetMessageData = {data.taggedMessage}
                                                                time = {getMessageTime(`${data.dateTime}`)}  
                                                                status = {getMessageSendingStatus(data.isIncomingMessage, data.isSend, data.isReceive, data.isRead)}
                                                                onTaggedMessage = {this.props.onTaggedMessage}
                                                                onEnableDeletion = {this.props.onEnableDeletion}
                                                                onShareMessage = {this.props.onShareMessage}
                                                             />)
        return (
            <div className="list-message" id="list-message">
                {messages}
            </div>
        )
    }
}


function getMessageSendingStatus(isIncomingMessage: boolean, isSend:boolean, isReceive:boolean, isRead:boolean)
{
    if(!isIncomingMessage && isSend && isReceive && isRead) return "read"
    else if(!isIncomingMessage && isSend && isReceive) return "received";
    else if(!isIncomingMessage && isSend) return "send"
    else return "not-send"
}

export default ListMessage

