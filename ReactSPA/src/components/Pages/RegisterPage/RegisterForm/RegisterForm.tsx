import { Component, FormEvent } from 'react';
import TextFormField from "../../../shared/textformfield/TextFormField";
import SubmitFormButton from "../../../shared/submitformbutton/SubmitFormButton";

import { validateNumber, validateEmail, validatePassword } from '../../../shared/utils/functions';

import "./RegisterForm.css"
import { Credential } from '../../../shared/utils/Types';

class RegisterForm extends Component
{    
    state = {
        fieldType: "login",
        login:"",
        password:"",
        rpassword:"",
        loginAlertMessage:"",
        pseudoAlertMessage:"",
        passwordAlertMessage: "",
        rpasswordAlertMessage: ""
    }

    props:any = this.props

    validateEmail = (text:string) => validateEmail(text)
    validateNumber = (text:string) => validateNumber(text)
    validatePassword = (text:string) => validatePassword(text)

    handleSubmit = (event:FormEvent) => {
        event.preventDefault()
        
        let isValid = this.state.password === this.state.rpassword
        isValid = isValid && (validateEmail(this.state.login) || validateNumber(this.state.login))
        isValid = isValid && validatePassword(this.state.password)
        if(isValid)
        {    
            let data: Credential = {
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
        let fieldNames = new Set(["login", "pseudo", "password", "rpassword"])
        fieldName = fieldName.toLocaleLowerCase().trim() 
        if(fieldNames.has(fieldName))
        {
            if(fieldName === "login")
            {
                var isNumber = parseInt(fieldValue).toString().length === fieldValue.length
                isNumber = isNumber || ((parseInt(fieldValue).toString().length === fieldValue.length - 1) && fieldValue.startsWith("+"))
                if(fieldValue === "")
                    this.setState({fieldType: "login", loginAlertMessage: ""})
                    
                else if(!isNaN(parseInt(fieldValue)) && isNumber)
                {
                    if(this.validateNumber(fieldValue))
                    {
                        this.setState({'login' : fieldValue})
                        this.setState({fieldType: "phone", loginAlertMessage: "success"})
                    }
                    else
                        this.setState({fieldType: "phone", loginAlertMessage: "Invalid Phone number!"})
                }
                else if(`${fieldValue}`.includes("@"))
                {
                    if(this.validateEmail(fieldValue))
                    {
                        this.setState({"login" : fieldValue})
                        this.setState({fieldType: "email", loginAlertMessage: "success"})
                    }
                    else
                        this.setState({fieldType: "email", loginAlertMessage: "invalid email!"})
                }
                else
                    this.setState({fieldType: "login", loginAlertMessage: "Invalid field! Choose either email or phone to login"})
            }
            else if (fieldName === "password")
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
                        this.setState({rpassword:fieldValue, rpasswordAlertMessage: "success"})
                    else
                        this.setState({rpassword:fieldValue, rpasswordAlertMessage: ""})
                }
            }
            else if (fieldName === "pseudo")
            {
                var pseudo = /^((?=.*[A-Za-z])[A-Za-z\d\W]){3,}$/
                if(!pseudo.test(fieldValue.trim()))
                    this.setState({pseudoAlertMessage: "Your username must have at least three letters"})
                else
                {
                    if(fieldValue !== "")
                        this.setState({pseudo:fieldValue.trim(), pseudoAlertMessage: "success"})
                    else
                        this.setState({pseudo:fieldValue.trim(), pseudoAlertMessage: ""})
                }
            }

        }
    }

    handleLeave = (fieldName:string, fieldValue:string) =>
    {
        
    }

    render(){
        return (
            <form className = "register-form" onSubmit = {this.handleSubmit}>
                <TextFormField fieldType = {this.state.fieldType} fieldName = "login" isRequired = {true} placeHolder = "Enter email or phone number"  alertMessage = {this.state.loginAlertMessage} onChange = {this.handleChange} onBlur = {this.handleLeave} key = "register-form-field1" required />
                <TextFormField fieldType = "password" fieldName = "password" isRequired = {true} placeHolder = "Enter your password" alertMessage = {this.state.passwordAlertMessage} onChange = {this.handleChange} onBlur = {this.handleLeave} key = "register-form-field3" required />
                <TextFormField fieldType = "password" fieldName = "rpassword" isRequired = {true} placeHolder = "Enter your password again" alertMessage = {this.state.rpasswordAlertMessage} onChange = {this.handleChange} onBlur = {this.handleLeave} key = "register-form-field4" required />
                <label className="list-group-item">
                    <input className="form-check-input me-1" type="checkbox" value="" />
                    Remember me
                </label>
                <SubmitFormButton />
            </form>
        )
    }
}

export default RegisterForm