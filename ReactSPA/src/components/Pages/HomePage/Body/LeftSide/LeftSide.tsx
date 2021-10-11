import { Component } from "react";
import ActionBar from "./ActionBar/ActionBar";
import ListConversation from './ListConversation/ListConversation';
import { UserProfile, ConversationDTO } from "../../../../shared/utils/Types";
import add from "./../../../../../wwwroot/images/plus_white.png"
import NewMessage from './NewMessage/NewMessage';
import NewGroup from './NewGroup/NewGroup';
import NewPrivateChat from './NewPrivateChat/NewPrivateChat';
import Cookies from "universal-cookie/es6";
import { requestWithBody, requestWithoutBody, validateEmail, validateNumber } from "../../../../shared/utils/functions";
import settings from "./../../../../../settings.json";

import './LeftSide.css'


class LeftSide extends Component{


    cookies =  new Cookies()
    settings = settings
    props:any = this.props
    _users: UserProfile[] = []
    _conversations:ConversationDTO[] = []
    state = {
        conversations: this._conversations ,
        typeConversationIsOpen : false,
        moreConversationIsDisplayed: false,
        newSenderIsChoose: false,
        alertUserFound: "",
        currentDisplayedPage: "conversation" 
    }

    formatAndAddConversations(data:Array<any>)
    {
        // var conversations = [...this.state.conversations]
        var conversations = []
        for(var conv of data){
            var conversation:ConversationDTO = {
                image: conv.photoFileName,
                category: "person",
                name: conv.name,
                datetime: conv.latestMessage.dateSent,
                unreads: conv.latestMessage.notReadCount,
                message: conv.latestMessage.shortBody,
                state: ((conv.latestMessage.notReadCount>0)?("unread"):(conv.latestMessage.notReceivedCount > 0)?("send"):("received")),
                identity: conv.id,
                id: conv.userChatRoomId
            }
            conversations.push(conversation)
        }
        this.setState({conversations})
    }

    openTypeConversatons = (event:any) => {
        event.currentTarget.style.setProperty("transition", "all ease-in-out .2s")
        if(this.state.typeConversationIsOpen === false)
            event.currentTarget.style.setProperty("transform", "rotate(225deg)")
        else
            event.currentTarget.style.setProperty("transform", "rotate(0deg)")
        this.setState({
                        typeConversationIsOpen: !this.state.typeConversationIsOpen,
                        moreConversationIsDisplayed: !this.state.typeConversationIsOpen,
                        currentDisplayedPage: "conversation"})
    }

    createPrivateChatRoom = (email:string|null, phoneNumber:string|null, userProfileId:string|number = -1) =>
    {
        console.log(email, email!==null, email !== null && validateEmail(email), phoneNumber, userProfileId)
        var toSend = ""
        if(email !== null && validateEmail(email??""))
            toSend = `emailAddress=${email}`
        else if(validateNumber(phoneNumber??""))
            toSend = `phoneNumber=${phoneNumber}`
        if(toSend !== "")
        {
            if(userProfileId !== "" && userProfileId > -1)
            toSend = `${toSend}&userProfileId=${userProfileId}`
            requestWithoutBody(`${settings.host}/api/ChatRoom/CreatePrivate?${toSend}`, "POST", this.props.authToken, this.sucessFunctionCreateChatRoom, this.errorCreateChatRoomFunction)
        }
        else
            console.log('error')
    }

    createNewGroup = (groupeName:string|null) =>
    {
        var toSend = ""
        if(groupeName !== null && groupeName.trim().toLowerCase().length > 0)
            toSend = `emailAdress=${groupeName}`
        
        if(toSend !== "")
        {
            var data = {
                "groupName": groupeName,
                "joinToken": "",
                "about": "Groupe description",
              }
            requestWithBody(`${settings.host}/api/ChatRoom/CreatePrivate?${toSend}`, "POST", data, this.cookies.get("token"), this.successCreateNewGroup, this.errorCreateNewGroup)
        }
        else
            console.log('error')
    }

    sucessFunctionCreateChatRoom = (result:any) => {
        var keys = Object.keys(result)
        console.log(result)
        if(keys.includes('chatRoomId'))
        {
            var identity = result.chatRoomId
            var name = result.userProfile.username
            var id = result.id
            var userId = result.id
            requestWithoutBody(`${settings.host}/api/ChatRoom/GetInfo?userChatRoomId=${result.id}`, "GET", this.props.authToken, (res:any)=>{
                name = res.name
                id = res.userChatRoomId
                identity = res.id
            }, (error:any)=>{})
            
            let elements = document.getElementsByClassName("new-conversation")
            if(elements.length >= 0)
                elements.item(0)?.setAttribute("style", "rotate:0deg;")//?.style.setProperty("rotate", "0deg")
            this.setState({
                typeConversationIsOpen: !this.state.typeConversationIsOpen,
                moreConversationIsDisplayed: !this.state.typeConversationIsOpen,
                currentDisplayedPage: "conversation"})
            this.props.openConversation(identity, id, userId, name, "person")
        }
        else 
        {
            // let isEmail = data.email !== undefined && data.email !== "" 
            // this.setState({alertUserFound: `No user found with this ${(isEmail)?"email":"phone number"}`})
            this.setState({alertUserFound: `Error! something happen wrong ${result.title}`  })
        }
    } 

    errorCreateChatRoomFunction = (error:any) => {
        this.setState({alertUserFound: `Error! ${error}`})
    }

    successCreatePrivateConversation = (result:any) =>
    {

    }

    errorCreatePrivateConversation = (error:any) =>
    {
        
    }

    successCreateNewGroup = (result:any) =>
    {

    }

    errorCreateNewGroup = (error:any) =>
    {
        
    }

    successGetConversations = (result:any) =>
    {
        try {
            this.formatAndAddConversations(result)   
        } catch (error) {}
    }

    errorGetConversations = (error:any) =>
    {
        
    }

    newMessage = (event:any) => {
        this.setState({
            moreConversationIsDisplayed: false, currentDisplayedPage: "newMessagePage"})
    }

    newGroup = (event:any) => {
        this.setState({
            moreConversationIsDisplayed: false, currentDisplayedPage: "newGroupPage"})
    }

    newChatRoom = (event:any) => {
        this.setState({
            moreConversationIsDisplayed: false, currentDisplayedPage: "newPrivateChatRoom"})
    }

    submitForm = (email:string|null = null, phoneNumber:string|null, groupName:string|null=null) => {
        console.log(email, phoneNumber)
        if (this.state.currentDisplayedPage !== "newGroupPage")
            this.createPrivateChatRoom(`${email}`.toLocaleLowerCase().trim(), 
                                                        `${phoneNumber}`.toLocaleLowerCase().trim(), this.props.userProfileId)    
        else
            this.createNewGroup(groupName)
    }

    handleChange = () => {
        this.setState({alertUserFound: ""})
    }

    getAllConversation = (userProfileId:string|number) =>{
        // console.log("userprofileid", this.props.userProfileId, this.cookies.get("userProfileId"));
        requestWithoutBody(`${settings.host}/api/chatroom/getall?userProfileId=${userProfileId}`, "GET", this.props.authToken, this.successGetConversations, this.errorGetConversations)
    }

    componentDidMount = () =>{
        // setInterval(() => this.getAllConversation(this.cookies.get("userProfileId")), 20000)
        this.getAllConversation(this.cookies.get("userProfileId"))
    }

    render(){
        let newPage = {"newMessagePage":<NewMessage handleChange = {this.handleChange} alertMessage = {this.state.alertUserFound} submitForm = {this.submitForm}/>,  "newGroupPage":<NewGroup submitForm = {this.submitForm}/>, "newPrivateChatRoom":<NewPrivateChat submitForm = {this.submitForm}/>}[this.state.currentDisplayedPage]           
        return(
            <div className="left-side">
                {(newPage !== null && newPage !== undefined)?(newPage):(
                    <>
                        <div >
                            <ActionBar  />
                        </div>
                        <div className = "conversation-list">
                            <ListConversation conversations = {this.state.conversations} openConversation={this.props.openConversation}/>
                        </div>
                    </>)
                }
                <div className = "more-conversations">
                    {(this.state.moreConversationIsDisplayed)?(<div className = "type-conversations">
                        <span onClick = {this.newMessage}> New message </span>
                        <span onClick = {this.newGroup}> New groupe </span>
                        {/* <span onClick = {this.newChatRoom}> Private tchat room</span> */}
                    </div>):null}
                    <div className = "new-conversation" onClick = {this.openTypeConversatons}>
                        <img src={add} alt="new" />
                    </div>
                </div>
            </div>
        )
    }
}

export default LeftSide
