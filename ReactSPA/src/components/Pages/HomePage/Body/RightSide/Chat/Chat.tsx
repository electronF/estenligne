import { Component } from "react";

import ListMessage from './ListMessage/ListMessage';
import SendMessageBar from './SendMessageBar/SendMessageBar';

import "./Chat.css"

class Chat extends Component{
    props:any = this.props

    render(){
        return (
            <div className = "chat">
                < ListMessage messages = {this.props.messages} />
                < SendMessageBar onSendMessage = {this.props.onSendMessage} name = {this.props.name} category = {this.props.category} />
            </div>
        )
    }
}

export default Chat 