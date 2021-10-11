import {Component} from "react";

import {Redirect} from 'react-router-dom';

import PageName from "../../shared/pagename/PageName";

import UserProfileForm from "./UserProfileForm/UserProfileForm";
import {UserProfile} from "../../shared/utils/Types";
import {requestWithBody} from "../../shared/utils/functions";
import Cookies from "universal-cookie/es6";
import settings from './../../../settings.json';

import "./UserProfilePage.css";


class UserProfilePage extends Component{
    
    cookies = new Cookies()
    settings = settings
    props:any = this.props
    _alertMessage = ""
    _alertType = "error"
    
    state = {
        userName:"",
        profileIsSetted: false,
        alertMessage: this._alertMessage,
        alertType: this._alertType
    }

    successFunction = (result:any) =>
    {
        var keys = Object.keys(result)
        if(keys.includes("id"))
            this.setState({profileIsSetted: true, alertMessage:''})
        else
            this.setState({profileIsSetted: false, alertMessage:result})
    }

    errorFunction = (error:any) =>
    {
        this.setState({profileIsSetted: false,  alertMessage: `Something append wrong ${error}`})
    }

    uploadImage = (data:File|null) =>
    {
        return true;
    }

    submitForm = (data:UserProfile) => {
        var newData = {about: data.about??"", username:data.name, identity:this.cookies.get("identity")} 
        requestWithBody(`${this.settings.host}/api/userprofile`, "POST", newData, this.cookies.get("token"), this.successFunction, this.errorFunction)
    }

    render(){
        return(
            <div className = "profile-page" >
                <div className = "title">
                    <PageName name = "Profile Page" key = "profilepage-name"/>    
                </div>
                <div className = "content">
                    <UserProfileForm uploadImage={this.uploadImage} alertType={this.state.alertType} alertMessage = {this.state.alertMessage} submitForm = {this.submitForm} key = "profilepage-form" />
                </div>
                {(this.state.profileIsSetted)?<Redirect to="/home" />:null}
            </div>
        )    
    }
}

export default UserProfilePage