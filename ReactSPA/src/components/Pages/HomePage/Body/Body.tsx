import { Component } from "react";
import LeftSide from "./LeftSide/LeftSide";
import RightSide from './RightSide/RightSide';

// import messageList from "./../../../../wwwroot/data/messages.json"
import { FileDTO, MessageDTO } from "../../../shared/utils/Types";
import { requestWithBody, requestWithoutBody } from "../../../shared/utils/functions";
import settings from "./../../../../settings.json";

import "./Body.css";

class Body extends Component
{
    props:any = this.props
    settings = settings
    _msgs: MessageDTO [] = [] 
    _category:string|number = ""
    _interval:any = -1
    unReadMessages:number[] = []
    state = {
        messages:this._msgs,
        identity:"",
        id:"",
        senderId: "",
        name:"",
        category: this._category
    }

    markMessageAsReceived = (messageId:string|number) =>
    {
        var date = new Date().toISOString()
        requestWithoutBody(
            `${settings.host}/api/message/received?messageSentId=${messageId}&dateReceived=${date}`,
            "POST",
            this.props.authToken, 
            (result:any)=>{
                console.log(result)
            }, 
            (error:any)=>{

            })
    }

    
    markMessgeAsRead = (messageId:string|number) =>
    {
        var date = new Date().toISOString()
        requestWithoutBody(
            `${settings.host}​/api​/message​/read?messageSentId=${messageId}&dateRead=${date}`,
            "PATCH",
            this.props.authToken,
            (result:any)=>{
                var keys = Object.keys(result)
                if(keys.includes("id"))
                    this.unReadMessages.push(result.id)
                console.log(result)
            }, 
            (error:any)=>{

            })
    }

    successGetMessages = (result:any) =>{
        if(typeof result === "object" && result.length !== undefined)
        {
            var messages = [] 
            for(var message of result)
            {
                var localUTCFuseInMilliseconds = new Date().getTimezoneOffset()*3600*1000
                if(!(message.senderId === this.state.id) && message.dateRead === null)
                {
                    // this.markMessgeAsRead(message.id)
                    // this.markMessageAsReceived(message.id)dateReceived
                }
                var newMessage:MessageDTO = {
                    identity:this.state.identity,//can be email or id as number
                    userId:this.state.id,//can be email or id as number
                    file:message.file,
                    name:message.senderName,
                    message:message.body,
                    isRead:message.dateRead !== null,
                    isSend: message.dateSent !== null,
                    isReceive: message.dateReceived !== null,
                    isIncomingMessage: !(message.senderId === this.state.id),
                    dateTime: new Date(Date.parse(message.dateSent) - localUTCFuseInMilliseconds).toISOString(),
                    category:"person",
                    isTagget: message.linkedId !== null,
                    isTransfered: message.authorId !== null
                }
                messages.push(newMessage)
            }
            this.setState({messages})
        }
        else
        {
            alert("Error when getting message")
        }
    }

    errorGetMessages = (error:any) => {
        console.log(error)
    }

    getAllMessage(id:string|number)
    {
        requestWithoutBody(`${settings.host}/api/message/getmany?userChatRoomId=${id}`, "GET", this.props.authToken, this.successGetMessages, this.errorGetMessages)
    }
    //method to get the list of message in a chat room
    openConversation = (identity:number|string, id:number|string, senderId:number|string, name:string, category:string|number) => {
        this.unReadMessages = []
        this.setState({identity, id, senderId, name, category, messages: []})
        clearInterval(this._interval)
        // this._interval = setInterval(() => this.getAllMessage(id), 1000000)
        this.getAllMessage(id)
        
        try {
            this.props.getReceiverInformation(identity, id, name, category)
        } catch (error) {}
    }

    onSendMessage = (message="", file:any="", name = "", category="person")=>{
        let date = new Date()
        let datetime = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        let messages = [...this.state.messages];
        let newMessage: MessageDTO = {
            identity: this.state.identity,
            userId: this.state.id,
            file: file,
            name: name,
            message: message,
            isRead: false,
            isSend: false, 
            isReceive: false,
            isIncomingMessage: false,
            dateTime:datetime,
            category: category
        }

        messages.push(newMessage)
        var shortMessage =     {
            "senderId": this.state.id,
            "messageTag": {
              "name": name,
              "chatRoomId": this.state.identity
            },
            "body": message,
            "dateSent": date.toISOString()
          } 
        //SendMessage to the server
        requestWithBody(`${settings.host}/api/message`, "POST", shortMessage, this.props.authToken, this.successSendMessage, this.errorSendMessage) 
        this.setState({messages})
    }

    getIncomingMessage = () =>  {
        
    }

    successGetIncommingMessage = (result:any) => {

    }

    errorGetIncommingMessage = (error:any) => {

    }

    successSendMessage = (result:any) =>{
        this.getAllMessage(this.state.id)
    }

    errorSendMessage = (error:any) =>{

    }

    successReceivedMessage = (result: any) =>{

    }

    errorReceivedMessage = (error: any) =>{

    }

    successReadMessage = (result: any) =>{

    }

    errorReadMessage = (error: any) =>{

    }


    render(){
        let messages = this.state.messages;
        messages = messages.sort((data1, data2) => {
                let value1 = (new Date(data1.dateTime)).getTime();
                let value2 = (new Date(data2.dateTime)).getTime();
                if(value1<value2) return -1;
                return 1;
             }
            )
        return(
            <div className="homepage-body">
                <LeftSide openConversation = {this.openConversation} userProfileId={this.props.userProfileId} authToken = {this.props.authToken} key="home-page-right-side"/>
                <RightSide chatIsSelected = {this.state.identity !== "" || this.state.id !== "" } messages = {messages} onSendMessage={this.onSendMessage} userProfileId={this.props.userProfileId} authToken = {this.props.authToken} name={this.state.name} category = {this.state.category} key="home-page-leftside"/>
            </div>
        )
    }
}

export default Body
