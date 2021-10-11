import { Component, FormEvent } from 'react';
import TextFormField from '../../../../../shared/textformfield/TextFormField'
import SubmitFormButton from '../../../../../shared/submitformbutton/SubmitFormButton';
import { validateEmail, validateNumber } from '../../../../../shared/utils/functions';
import { Credential } from '../../../../../shared/utils/Types';

import "./NewMessage.css"
import FormMessage from '../../../../../shared/formmessage/FormMessage';

class NewMessage extends Component {
    props:any = this.props
    
    state = {
        fieldType: "login",
        login:"",
        loginAlertMessage:""
    }

    validateEmail = (text:string) => validateEmail(text)
    validateNumber = (text:string) => validateNumber(text)

    handleSubmit = (event:FormEvent) => {
        event.preventDefault()
        let isValid = validateEmail(this.state.login) || validateNumber(this.state.login)
        if(isValid)
        {    
            let data: Credential = {
                password: "",
                email: null,
                phoneNumber: null
            }
            if(this.state.login.includes("@"))
                data.email = this.state.login
            else
                data.phoneNumber = this.state.login
            try {
                this.props.submitForm(data.email, data.phoneNumber)
            } catch (error) {
                console.log("error", error)}
        }
    }

    handleChange = (fieldName:string, fieldValue:string) => {
        if(fieldName === "login")
        {
            var isNumber = parseInt(fieldValue).toString().length === fieldValue.length
            isNumber = isNumber || ((parseInt(fieldValue).toString().length === fieldValue.length - 1) && fieldValue.startsWith("+"))    
            if(fieldValue === "")
                this.setState({fieldType: "login", loginAlertMessage: ""})
            else if(!isNaN(parseInt(fieldValue)) && isNumber)
            {
                if(this.validateNumber(fieldValue))
                    this.setState({fieldType: "phone", loginAlertMessage: "success", login: fieldValue})
                else
                    this.setState({fieldType: "phone", loginAlertMessage: "Invalid Phone number!"})
            }
            else if(`${fieldValue}`.includes("@"))
            {
                if(this.validateEmail(fieldValue))
                    this.setState({fieldType: "email", loginAlertMessage: "success", login: fieldValue})
                else
                    this.setState({fieldType: "email", loginAlertMessage: "invalid email!"})
            }
            else
                this.setState({fieldType: "login", loginAlertMessage: "invalid field! Choose either email or phone to login"})
        }
        this.props.handleChange()
    }

    handleLeave = (fieldName:string, fieldValue:string) =>
    {
        console.log(fieldName, fieldValue)
    }

    render() {
        return (
            <div className = "new-message"> 
                <div className='information'>
                    <span className = "title">Enter destinator adress</span> 
                    <span className="text-danger fs-6">{this.props.alertMessage}</span> 
                    <FormMessage type="error" message = "It may be email or phone" />
                </div>
                <form  onSubmit = {this.handleSubmit}>
                    <TextFormField fieldName = "login" fieldType = {this.state.fieldType} placeHolder = "Enter login or phone number" alertMessage = {this.state.loginAlertMessage} onChange = {this.handleChange} onBlur = {this.handleLeave} isRequired = {true} key = "newmessage-form-field" />
                    <SubmitFormButton buttonName = "Write" />
                </form>
            </div>
        )
    }
}

export default  NewMessage