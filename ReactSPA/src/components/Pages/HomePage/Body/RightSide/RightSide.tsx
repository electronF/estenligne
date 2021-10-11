import { Component } from "react";

import "./RightSide.css"
import NoSelectedConversation from './NoSelectedConversation/NoSelectedConversation';
import Chat from "./Chat/Chat";

class RightSide extends Component{
    props:any = this.props
    render(){
        return (
            <div className="right-side">
                <div className="flex background">
                {
                    (this.props.chatIsSelected)?<Chat messages = {this.props.messages} onSendMessage = {this.props.onSendMessage} name = {this.props.name} category = {this.props.category} />:
                        <div className="no-conversation">
                            <NoSelectedConversation />
                        </div>
                }
                </div>
            </div>
        )
    }
}

export default RightSide