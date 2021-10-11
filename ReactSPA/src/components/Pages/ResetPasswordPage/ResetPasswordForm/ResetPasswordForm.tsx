import {FormEvent, Component} from "react"
import TextFormField from "../../../shared/textformfield/TextFormField"
import SubmitFormButton from '../../../shared/submitformbutton/SubmitFormButton';

import { validateEmail, validateNumber } from "../../../shared/utils/functions";
import { Credential as Credent} from "../../../shared/utils/Types";

import "./ResetPasswordForm.css"

class ResetPasswordForm extends Component{

    props:any = this.props

    state = {
        fieldType: "login",
        login:"",
        password:"",
        loginAlertMessage:"",
        passwordAlertMessage: ""
    }

    validateEmail = (text:string) => validateEmail(text)
    validateNumber = (text:string) => validateNumber(text)

    handleSubmit = (event:FormEvent) => {
        event.preventDefault()
        let isValid = validateEmail(this.state.login) || validateNumber(this.state.login)
        if(isValid)
        {    
            let data: Credent = {
                password: "",
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
    }

    handleLeave = (fieldName:string, fieldValue:string) =>
    {

    }
    
    render(){
        return <form className="resetpassword-form" onSubmit = {this.handleSubmit}>
            <TextFormField fieldName = "login" fieldType = {this.state.fieldType} alertMessage = {this.state.loginAlertMessage} onChange = {this.handleChange} onBlur = {this.handleLeave} isRequired = {true} key = "resetpassword-form-field" />
            <SubmitFormButton buttonName="RESET" key = "resetpassword-form-button" />
        </form> 
    }
}

export default ResetPasswordForm