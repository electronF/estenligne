import { Component, FormEvent } from 'react';

import darkEmailImage from "./../../../wwwroot/images/email_dark.png"
// import whiteEmailImage from "./../../../wwwroot/images/email_white.png"
import darkPasswordImage from "./../../../wwwroot/images/lock_dark.png"
// import whitePasswordImage from "./../../../wwwroot/images/lock_white.png"
import darkPhoneImage from "./../../../wwwroot/images/phone_dark.png"
// import whitePhoneImage from "./../../../wwwroot/images/phone_white.png"
import darkLoginImage from "./../../../wwwroot/images/login_white.png"
import whiteLoginImage from "./../../../wwwroot/images/login_dark.png"


import "./TextFormField.css"

class TextFormField extends Component
{
    fieldType = ""
    fieldName = "name"
    isRequired = false
    placeHolder = "Write something here";
    type:string = ""
    image = whiteLoginImage
    isFocused = false
    state = {
        fieldValue:""
    }

    props:any = this.props

    handleChange = (event:any) => {
        this.setState({fieldValue: event.currentTarget.value})
        try {
            this.props.onChange(this.fieldName, event.currentTarget.value)
        } catch (error) {}
        
    }

    handleLeave = (event:any) => {
        this.isFocused = false
        this.onMouseLeave(event)
        try {
            this.props.onBlur(this.fieldName, event.currentTarget.value)
        } catch (error) {}
    }

    componentWillMount = () => {
        let {placeHolder, fieldName, isRequired} = this.props
        if(placeHolder !== undefined && placeHolder !== null)
            this.placeHolder = placeHolder

        if(fieldName !== undefined && fieldName !== null)
            this.fieldName = fieldName
        
        if(isRequired !== undefined && isRequired !== null)
            this.isRequired = isRequired
    }

    private fieldTypeAndImage(fieldType: any) {
        fieldType = `${fieldType}`.trim().toLocaleLowerCase()

        const validFieldType = new Set(["email", "password", "text", "phone", "login"])
        if (validFieldType.has(fieldType)) {
            this.fieldType = fieldType
            this.type = {
                "email": "text",
                "password": "password",
                "text": "text",
                "phone": "text",
                "login": "text"
            }[this.fieldType] ?? "text"
            this.image = {
                "email": darkEmailImage,
                "password": darkPasswordImage,
                "text": darkLoginImage,
                "phone": darkPhoneImage,
                "login": darkLoginImage
            }[this.fieldType] ?? this.image
        }
    }

    onMouseEnter = (event:FormEvent) => {
        if(!this.isFocused)
        {
            let parentElment = event.currentTarget.parentElement;
            parentElment?.style.setProperty("box-shadow", "0 0 4px 2px rgb(0, 100, 200)")
            parentElment?.style.setProperty("border-color", "skyblue !important")
        }
    }

    onFocus = (event:FormEvent) => {
        this.isFocused = true;
        let parentElment = event.currentTarget.parentElement;
        parentElment?.style.setProperty("box-shadow", "0 0 4px 2px blue")
    }

    onMouseLeave = (event:FormEvent) => {
        if(!this.isFocused)
        {
            let parentElment = event.currentTarget.parentElement;
            parentElment?.style.setProperty("box-shadow", "none")
            parentElment?.style.setProperty("border-color", "skyblue !important")
        } 
    }

    render(){
        let fieldId = `${this.type}-${Math.random()}`
        let alertMessage = this.props.alertMessage
        alertMessage = (alertMessage??(alertMessage === undefined)?"":alertMessage) 
        alertMessage = `${this.props.alertMessage}`.toLocaleLowerCase().trim()
        let isSuccess = false
        let isError = false
        let {fieldType} =  this.props
        this.fieldTypeAndImage(fieldType)
        if(alertMessage !== "")
        {
            isSuccess = alertMessage === "success"
            alertMessage = (alertMessage === "success")?"":alertMessage
            isError = (alertMessage !== "")?true:false
        }

        return (
            <div className = "form-group row text-form-field">
                <div className = "col-sm-12">    
                    <span>{alertMessage}</span>
                </div>
                <div className = "col-sm-12">    
                    <fieldset className = {`col-sm-12 ${((isSuccess)?("success"):((isError)?"error":"normal"))}`} >
                        <label htmlFor={fieldId} onMouseEnter = {this.onMouseEnter} onMouseLeave = {this.onMouseLeave}><img  src={this.image} alt={this.type} /></label>
                        <input type={this.type} id = {fieldId} name = {this.fieldName} className="form-control" onFocus = {this.onFocus}  onMouseEnter = {this.onMouseEnter} onMouseLeave = {this.onMouseLeave} placeholder={this.placeHolder} value={this.state.fieldValue} onChange={this.handleChange} onBlur = {this.handleLeave} required = {this.isRequired} />
                    </fieldset>
                </div>
            </div>
        );
    };
}

export default TextFormField
