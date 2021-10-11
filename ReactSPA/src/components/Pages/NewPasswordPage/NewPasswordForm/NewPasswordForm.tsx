import {Component, FormEvent} from "react"
import TextFormField from "../../../shared/textformfield/TextFormField"
import SubmitFormButton from '../../../shared/submitformbutton/SubmitFormButton';

import { validatePassword } from "../../../shared/utils/functions";
import { Credential } from "../../../shared/utils/Types";

import "./NewPasswordForm.css"

class NewPasswordForm extends Component{
    state = {
        password:"",
        rpassword:"",
        passwordAlertMessage: "",
        rpasswordAlertMessage: ""
    }

    props:any = this.props

    validatePassword = (text:string) => validatePassword(text)

    handleSubmit = (event:FormEvent) => {
        event.preventDefault()
        
        let isValid = this.state.password === this.state.rpassword
        isValid = isValid && validatePassword(this.state.password) && validatePassword(this.state.password)
        if(isValid)
        {    
            let data: Credential = {
                password: this.state.password,
                email: null,
                phoneNumber: null
            }
            try {
                this.props.submitForm(data)
            } catch (error) {}
        }
    }

    handleChange = (fieldName:string, fieldValue:string) => {
        let fieldNames = new Set(["login", "password", "rpassword"])
        fieldName = fieldName.toLocaleLowerCase().trim() 
        if(fieldNames.has(fieldName))
        {
            if (fieldName === "password")
            {
                if(validatePassword(fieldValue) || fieldValue.length === 0)
                {
                    if(validatePassword(fieldValue))
                        this.setState({password:fieldValue, passwordAlertMessage: "success"})
                    else
                        this.setState({password:fieldValue, passwordAlertMessage: ""})
                }
                else 
                    this.setState({passwordAlertMessage: "Password must contains at least 6 characters"})
            }
            else if (fieldName === "rpassword")
            {
                if(this.state.password !== fieldValue)
                    this.setState({rpasswordAlertMessage: "Your password must be same"})
                else
                {
                    if(fieldValue !== "")
                        this.setState({rpassword: fieldValue, rpasswordAlertMessage: "success"})
                    else
                        this.setState({rpassword: fieldValue, rpasswordAlertMessage: ""})
                }
            }

        }
    }

    handleLeave = (fieldName:string, fieldValue:string) =>
    {
        
    }

    render(){
        return <form onSubmit = {this.handleSubmit} className="newpassword-form">
            <TextFormField fieldName = "password" fieldType = "password" alertMessage = {this.state.passwordAlertMessage} onChange = {this.handleChange} onBlur = {this.handleLeave} isRequired = {true} key = "newpassword-form-field1"/>
            <TextFormField fieldName = "rpassword" fieldType = "password" alertMessage = {this.state.rpasswordAlertMessage} onChange = {this.handleChange} onBlur = {this.handleLeave} isRequired = {true} key = "newpassword-form-field2" />
            <SubmitFormButton buttonName="SAGE" key = "newpassword-form-button" />
        </form> 
    }
}

export default NewPasswordForm