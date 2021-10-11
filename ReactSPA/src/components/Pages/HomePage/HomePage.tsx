import { Component } from "react";

import { initializeApp, FirebaseApp } from "firebase/app";
import { getMessaging, getToken, Messaging } from "firebase/messaging";

import Body from "./Body/Body";
import Head from "./Head/Head";
import Cookies from 'universal-cookie';
import { requestWithBody, requestWithoutBody } from "../../shared/utils/functions";

import firebaseSettings from "./../../../firebasesettings.json"
import settings from './../../../settings.json';

import "./HomePage.css"
import SpinnerProgress from '../../shared/SpinnerProgress/SpinnerProgress';
// 
class HomePage extends Component
{
    cookies = new Cookies()
    settings = settings
    _id:string|number = ""
    state = {
        displayReceiverInformation : false,
        dataAreGetted: false,
        receiverProfile : {
            id : this._id,
            email: "",
            name: "",
            category: "person",
            image: ""
        },
        senderProfile : {
            id : this._id,
            email: "",
            name: "",
            category: "person",
            image: ""
        }
    }

    firebaseSettings = firebaseSettings

    app:FirebaseApp |null = null
    messaging:Messaging|null = null

    props:any = this.props

    sucessGetMessages = (response:any) =>{
        console.log(response)
    }

    errorGetMessage = (error:any) =>{

    }

    loadData = () => {
        let userId = this.cookies.get("userId")
    }

    successGetProfileFunction = (result:any) => {
        let _keys = Object.keys(result);
        if(_keys.includes("userProfileId"))
        {

            this.setState({senderProfile : {
                id : result.userProfileId,
                identity: result.userProfile.identity,
                name: result.userProfile.username,
                category: "person",
                image: ""
                }, 
                dataAreGetted:true
            })
            let date = new Date()
            let expirationDate = new Date()
            expirationDate.setMinutes(date.getMinutes() + 7 * 24 * 60)  
            this.cookies.set("deviceUsedId", result.id, {sameSite: true, expires:expirationDate})
            this.cookies.set("userProfileId", result.userProfileId, {sameSite: true, expires:expirationDate})   
        }
        else
        {
            //Replace by modal
            alert("Sorry we are not able to get some important information. We inform our team about it.")
        }
    }

    errorGetProfileFunction = (error:any) => {
        //Replace with model or alert zone
        alert("Sorry we are not able to perform operation. Check your internet connexion")
    }

    componentDidMount = () => {
        //Get userprofileid
        requestWithoutBody(`${this.settings.host}/api/DeviceUsed?devicePlatform=${this.settings.devicePlatform}`, "PUT", this.cookies.get('token')??"", this.successGetProfileFunction, this.errorGetProfileFunction)
        
        this.app = initializeApp(this.firebaseSettings.firebaseConfig)
        this.messaging = getMessaging(this.app);
        
        var keys:any = {vapidKey: this.firebaseSettings.VAPID}
        console.log("device used token", this.cookies.get("deviceUsedId"))
        getToken(keys).then((currentToken) => {
            if (currentToken) {
                console.log("token is getted from firebase", currentToken)
                requestWithoutBody(
                    `${settings.host}/api/DeviceUsed/RegisterFcmToken?deviceUsedId=${this.cookies.get("deviceUsedId")}&fcmToken=${currentToken}`, 
                    "PATCH", 
                    this.props.authToken, 
                    this.successSendingFirebaseTokenToServer, 
                    this.errorSendingFirebaseTokenToServer
                )
            } else {
              // Show permission request UI
              console.log('No registration token available. Request permission to generate one.');
              // ...
            }
          }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
            // ...
          });;
    }

    successSendingFirebaseTokenToServer = (result:any) =>{
        console.log("response body")
    }

    errorSendingFirebaseTokenToServer = (error:any) =>{
        console.log("error")
    }


    getReceiverInformation = (identity:string, id:number|string, name:string, category:string|number) => {
        if(identity !== "" )//|| id !== "" || name !== ""
        {
            this.setState({displayReceiverInformation: true})
            this.setState({receiverProfile: {identity, id, name, category, image : ""}})
        }
    }

    render(){
        return (
            <div className="home-page">
            {(!this.state.dataAreGetted)?
                 <SpinnerProgress size = {1} message="Please wait we collecting your data" textSize="fs-4" textInside = {true} />
                :<>
                    <Head displayReceiverInformation = {this.state.displayReceiverInformation} receiverProfile = {this.state.receiverProfile} senderProfile = {this.state.senderProfile} />
                    <Body getReceiverInformation = {this.getReceiverInformation} userProfileId={this.state.senderProfile.id} authToken = {this.cookies.get("token")} />
                </>
            }
            </div>
        )
    }
}

export default HomePage