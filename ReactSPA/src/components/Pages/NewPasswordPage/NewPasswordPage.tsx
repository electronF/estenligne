import { Component} from 'react';

import {Link} from "react-router-dom";

import NewPasswordForm from "./NewPasswordForm/NewPasswordForm";
import FormMessage from "../../shared/formmessage/FormMessage";
import PageName from '../../shared/pagename/PageName';
import { Credential } from "../../shared/utils/Types";
import {VerticalLogo} from "../../shared/logo/Logos";

import './NewPasswordPage.css'

class NewPasswordPage extends Component{

    props:any = this.props

    submitForm = (data:Credential) => {
        console.log({"email":data.email, "phone":data.phoneNumber, "password":data.password})
    }

    render(){
        return (
            <div className = "newpassword-page" key="newpassword-page">
                <div className="title" key="newpassword-page-name-section">
                    <PageName name="New Password" key = "newpassword-page-name"/>
                </div>
                <div className = "content" key="newpassword-page-tools-sections">
                    <VerticalLogo key = "newpassword-page-logo"/>
                    <FormMessage type="error" message="Enter the new password" key = "newpassword-page-alert-message"/>
                    <NewPasswordForm submitForm = {this.submitForm} key = "login-page-form"/>
                    <Link to="/login" key = "forgotpassword-page-link2" className="fs-5 fw-bold link-secondary">{'>>'} Logout {'<<'}</Link>
                </div>
            </div>
        )
    }
}

export default NewPasswordPage