
import { Component, FormEvent } from 'react';

import TextFormField from "../../../shared/textformfield/TextFormField"
import SubmitFormButton from '../../../shared/submitformbutton/SubmitFormButton';
import { validateEmail, validateNumber, validatePassword } from "../../../shared/utils/functions";
import { Credential as Credent } from '../../../shared/utils/Types';

import "./LoginForm.css"

class LoginForm extends Component{    
    state = {
        fieldType: "login",
        login:"",
        password:"",
        loginAlertMessage:"",
        passwordAlertMessage: ""
    }

    props:any = this.props

    validateEmail = (text:string) => validateEmail(text)
    validateNumber = (text:string) => validateNumber(text)
    validatePassword = (text:string) => validatePassword(text)

    handleSubmit = (event:FormEvent) => {
        
        event.preventDefault()
        let isValid = validateEmail(this.state.login) || validateNumber(this.state.login)
        isValid = isValid && validatePassword(this.state.password)
        if(isValid)
        {    
            let data: Credent = {
                password: this.state.password,
                email: null,
                phoneNumber: null
            }
            if(this.state.login.includes("@"))
                data.email = this.state.login
            else
                data.phoneNumber = this.state.login
            try {
                this.props.submitForm(data)
            } catch (error) {}
        }
    }

    handleChange = (fieldName:string, fieldValue:string) => {
        let fieldNames = new Set(["login", "password"])
        fieldName = fieldName.toLocaleLowerCase().trim() 
        if(fieldNames.has(fieldName))
        {
            this.setState({[fieldName]: fieldValue})
            if(fieldName === "login")
            {
                var isNumber = parseInt(fieldValue).toString().length === fieldValue.length
                isNumber = isNumber || ((parseInt(fieldValue).toString().length === fieldValue.length - 1) && fieldValue.startsWith("+"))
                if(fieldValue === "")
                    this.setState({fieldType: "login", loginAlertMessage: ""})
                else if(!isNaN(parseInt(fieldValue)) && isNumber)
                {
                    if(this.validateNumber(fieldValue))
                        this.setState({fieldType: "phone", loginAlertMessage: "success"})
                    else
                    this.setState({fieldType: "phone", loginAlertMessage: "Invalid Phone number!"})
                }
                else if(`${fieldValue}`.includes("@"))
                {
                    if(this.validateEmail(fieldValue))
                        this.setState({fieldType: "email", loginAlertMessage: "success"})
                    else
                        this.setState({fieldType: "email", loginAlertMessage: "invalid email!"})
                }
                else
                    this.setState({fieldType: "login", loginAlertMessage: "invalid field! Choose either email or phone to login"})
            }
            else if(fieldName === "password")
            {
                if(validatePassword(fieldValue) || fieldValue.length === 0)
                {
                    if(validatePassword(fieldValue))
                        this.setState({passwordAlertMessage: "success"})
                    else
                        this.setState({passwordAlertMessage: ""})
                }
                else 
                    this.setState({passwordAlertMessage: "Password must contains at least 6 characters"})
            }
        }
    }

    handleLeave = (fieldName:string, fieldValue:string) =>
    {

    }

    render(){
        return <form className="login-form" onSubmit = {this.handleSubmit}>
            <TextFormField fieldName = "login" fieldType = {this.state.fieldType} alertMessage = {this.state.loginAlertMessage} onChange = {this.handleChange} onBlur = {this.handleLeave} isRequired = {true} key = "login-form-field1" />
            <TextFormField fieldName = "password" fieldType = "password" alertMessage = {this.state.passwordAlertMessage} onChange = {this.handleChange} onBlur = {this.handleLeave} isRequired = {true} key = "login-form-field2" />
            <label className="list-group-item">
                <input className="form-check-input me-1" type="checkbox" value="" />
                Remember me
            </label>
            <SubmitFormButton buttonName="LOGIN" key = "login-form-button" />
        </form> 
    }
}

export default LoginForm