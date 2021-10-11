import { Component } from "react";

import "./ListConversation.css"

import Conversation from './Conversation/Conversation';

class ListConversation extends Component
{

    element:any = null
    props:any = this.props
    state = {
        prevSelectedConversation:this.element
    }

    setFocus = (event:any, id:number|string, email:string, name:string, category:number|string) => {
        let prevSelectedConversation = this.state.prevSelectedConversation
        if(prevSelectedConversation !== null )
            prevSelectedConversation.classList.remove("selected-conversation")
        
        prevSelectedConversation = event.currentTarget
        prevSelectedConversation.classList.add("selected-conversation")
        this.setState({prevSelectedConversation})
        this.props.openConversation(email, id, -1, name, category)
        try {   
        } catch (error) {}
    }

    render() {
        let conversations = (this.props.conversations === undefined)?[]:this.props.conversations
        conversations.sort( (data:any) => (new Date(data.datetime)).getTime())
        let discutionList = conversations.map((data:any) => <Conversation key={data.id} onClick={(event:any) => this.setFocus(event, data.id, data.identity, data.name, data.category)} data = {data}/>)
        return (
            <div className="list-conversation">
                {discutionList}
            </div>
        )
    }
}
export default ListConversation