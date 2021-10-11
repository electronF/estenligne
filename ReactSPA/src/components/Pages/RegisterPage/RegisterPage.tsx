import { Component } from "react";

import { Link, Redirect } from 'react-router-dom';

import PageName from "../../shared/pagename/PageName";
import { VerticalLogo } from "../../shared/logo/Logos";
import FormMessage from "../../shared/formmessage/FormMessage";
import RegisterForm from "./RegisterForm/RegisterForm";

import "./RegisterPage.css"
import { Credential } from "../../shared/utils/Types";

class RegisterPage extends Component{
    props:any = this.props
    _alertMessage = "Use either email or phone number"
    _alertType = "error"
    state = {
        userName:"",
        isRegister: false,
        alertMessage: this._alertMessage,
        alertType: this._alertType
    }

    successFunction = (result:any) =>
    {
        var keys = Object.keys(result)
        if(keys.includes("id"))
            this.setState({isRegister: false, alertType : 'success',  alertMessage: `Account is created and an ${(result.email !== null)?"email to your email adress":"message to your phone number"}`})
        else
            this.setState({isRegister: false, alertType : 'error',  alertMessage: `Error!\n${result}`})
    }

    errorFunction = (error:any) =>
    {
        this.setState({isRegister: false, alertType : 'error',  alertMessage: `Something append wrong ${error}`})
    }

    submitFunction(url:string, type:string, data:any, successFunction:Function, errorFunction:Function)
    {
        fetch(url, {
            "method": type,
            headers: {
              'Content-Type': 'application/json',
              'accept': 'application/json'
            },
            "body": JSON.stringify(data)
            }).then(response => response.json())
            .then(
                (result) => {
                    successFunction(result)
                },
                (error) => {
                    errorFunction(error)
                }
            );
    }

    submitForm = (data:Credential) => {
        var newData = {}
        if(data.email !== null)
            newData = {email: data.email,  password:data.password} 
        else 
            newData = { phoneNumber: data.phoneNumber, password:data.password} 
        this.submitFunction("https://www.estenligne.com:44364/api/Account/Register", "POST", newData, this.successFunction, this.errorFunction)
    }

    render(){
        return(
            (this.state.isRegister)?
            (<Redirect to = "login"/>):(<div className = "register-page" >
                <div className = "title">
                    <PageName name = "Register" key = "register-page-name"/>    
                </div>
                
                <div className = "content">
                    <VerticalLogo key = "register-page-logo"/>
                    <FormMessage type={this.state.alertType} message = {this.state.alertMessage} key = "register-page-alert-message"/>
                    <RegisterForm submitForm = {this.submitForm} key = "register-page-form" />
                    <Link to="/login" key = "register-page-link" className="fs-5 fw-bold link-secondary">{'>>'} Login {'<<'}</Link>
                </div>
            </div>)
        )    
    }
}

export default RegisterPage