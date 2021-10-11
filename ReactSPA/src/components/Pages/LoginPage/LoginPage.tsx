import { Component } from "react";
import { Link, Redirect } from 'react-router-dom';
import Cookies from "universal-cookie";

import LoginForm from "./LoginForm/LoginForm";
import FormMessage from "../../shared/formmessage/FormMessage";

import PageName from '../../shared/pagename/PageName';
import {VerticalLogo} from "../../shared/logo/Logos";
import { Credential } from "../../shared/utils/Types";


import { requestWithBody } from "../../shared/utils/functions";
import settings from './../../../settings.json';

import './LoginPage.css'

class LoginPage extends Component{
    _alertMessage = "Use either email or phone number"
    _alertType = "error"
    cookies = new Cookies()
    settings = settings
    state = {
        isAuthenticated: false,
        nextPage:'',
        alertMessage: this._alertMessage,
        alertType: this._alertType
    }
    
    props:any = this.props
    submitForm = (data:Credential) => {
        var newData = {}
        var identity = data.phoneNumber
        if(data.email != null)
        {
            identity = data.email
            newData = {email:data.email, password:data.password, rememberMe: true}
        }
        else        
            newData = {phoneNumber:data.phoneNumber, password:data.password, rememberMe: true}
        data.remenberMe = true
        fetch(`${this.settings.host}/api/account/signin`, {
            "method": "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(newData)
            }).then(response => response.json())
            .then(
                (result) => {
                    let keys = Object.keys(result)
                    if(keys.includes("token"))
                    {
                        this.setState({isAuthenticated: true, alertType : 'success',  alertMessage: `Successfull login ${result.userName} you will be redirect soon`})
                        let date = new Date()
                        let expirationDate = new Date()
                        expirationDate.setMinutes(date.getMinutes() + 7 * 24 * 60)
                        this.cookies.set("isAuthenticated", true, {sameSite: true, expires:expirationDate })
                        this.cookies.set("userId", result.id, {sameSite: true, expires:expirationDate })
                        this.cookies.set("identity", identity, {sameSite: true, expires:expirationDate })
                        this.cookies.set("token", result.token, {sameSite: true, expires:expirationDate })
                        
                        requestWithBody(`${this.settings.host}/api/DeviceUsed?devicePlatform=${this.settings.devicePlatform}`, "PUT", {}, result.token??"", (res:any)=>{
                            let _keys = Object.keys(res);
                            if(_keys.includes("id") && _keys.includes("userProfileId"))
                            {
                                this.cookies.set("deviceUsedId", res.id, {sameSite: true, expires:expirationDate })
                                this.cookies.set("userProfileId", res.userProfileId, {sameSite: true, expires:expirationDate })
                                this.setState({nextPage: "home"})
                            }
                            else
                                this.setState({nextPage: "profile"})
                        }, (res:any)=>{
                            this.setState({alertMessage: "Error something append wrong with query"})
                        })
                        try {
                            this.props.changeAuthenticationState(true, result.id)
                        } catch (error) {}
                    }
                    else
                        this.setState({isAuthenticated: false, alertType : 'error',  alertMessage: `Error! ${result}`})
                },
                (error) => {
                    this.setState({isAuthenticated: false, alertType : 'error',  alertMessage: `Something append wrong ${error}`})
                }
            );
    }

    render(){
        return (
            <div className = "login-page" key="login-page">
                <div className="title" key="login-page-name-section">
                    <PageName name="Login" key = "login-page-name"/>
                </div>
                <div className = "content" key="login-page-tools-sections">
                    <VerticalLogo key = "login-page-logo"/>
                    <FormMessage type={this.state.alertType} message = {this.state.alertMessage} key = "login-page-alert-message"/>
                    <LoginForm submitForm = {this.submitForm} key = "login-page-form"/>
                    <Link to = '/resetpassword' key = "login-page-link1" className = "fs-6 fw-bold link-secondary">{'>'} Forgot Password {'<'}</Link>
                    <Link to = "/register" key = "login-page-link2" className="fs-5 fw-bold link-secondary">{'>>'} Create Account {'<<'}</Link>
                </div>
                {((this.state.nextPage === 'profile')?(<Redirect to="/shortprofile" />):((this.state.nextPage === 'home')?(<Redirect to="/home" />):(null)))}
            </div>
        )
    }
}

export default LoginPage