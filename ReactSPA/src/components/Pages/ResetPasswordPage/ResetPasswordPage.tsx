import { Component } from "react";

import {Link} from "react-router-dom";

import ResetPasswordForm from './ResetPasswordForm/ResetPasswordForm';
import FormMessage from "../../shared/formmessage/FormMessage";
import PageName from '../../shared/pagename/PageName';

import {VerticalLogo} from "../../shared/logo/Logos";
import './ResetPasswordPage.css'
import { Credential } from "../../shared/utils/Types";

class ResetPasswordPage extends Component{
    props:any = this.props
    
    _alertMessage = "Use either email or phone number"
    _alertType = "error"
    state = {
        alertMessage: this._alertMessage,
        alertType: this._alertType
    }

    submitForm = (data:Credential) => {
        console.log({"email":data.email, "phone":data.phoneNumber, "password":data.password})
    }

    render(){
        return (
            <div className = "resetpassword-page" key="resetpassword-page">
                <div className="title" key="login-page-name-section">
                    <PageName name="Reset Password" key = "resetpassword-page-name"/>
                </div>
                <div className = "content" key="resetpassword-page-tools-sections">
                    <VerticalLogo key = "resetpassword-page-logo"/>
                    <FormMessage type={this.state.alertType} message = {this.state.alertMessage} key = "resetpassword-page-alert-message"/>
                    <ResetPasswordForm submitForm = {this.submitForm} key = "resetpassword-page-form" />
                    <Link to="/login" key = "register-page-link" className="fs-5 fw-bold link-secondary">{'>>'} Login {'<<'}</Link>
                </div>
            </div>
        )
    }
}

export default ResetPasswordPage