import { Component, FormEvent } from 'react';
import TextFormField from "../../../shared/textformfield/TextFormField";
import SubmitFormButton from "../../../shared/submitformbutton/SubmitFormButton";

import { validateNumber, validateEmail, validatePassword } from '../../../shared/utils/functions';
import { UserProfile } from '../../../shared/utils/Types';
import defaultProfileImage from "./../../../../wwwroot/images/person.png";
import camera from "./../../../../wwwroot/images/camera.png";
import close from "./../../../../wwwroot/images/times_white.png";

import "./UserProfileForm.css"

class UserProfileForm extends Component
{    
    _img:string|Blob|null = "";
    state = {
        username: "",
        about:"Hi! Write me on EstEnLigne.",
        identity: "",
        image: this._img,
        usernameAlertMessage:"",
        aboutAlertMessage:"",
        imageAlertMessage: "",
        dislayUploadImageOptions:false
    }

    props:any = this.props

    validateEmail = (text:string) => validateEmail(text)
    validateNumber = (text:string) => validateNumber(text)
    validatePassword = (text:string) => validatePassword(text)

    handleSubmit = (event:FormEvent) => {
        event.preventDefault()
        
        let isValid = this.state.username.length > 2 && this.state.about.length > 2
        if(isValid)
        {    
            let data: UserProfile = {
                name: this.state.username,
                identity: this.state.identity,
                about: this.state.about,
                image: this.state.image
            }
            if(!(this.state.identity === null || this.state.identity === ""))
            {
                if(true){}
                else{}
            }
            try {
                this.props.submitForm(data)
            } catch (error) {}
        }
    }

    handleChange = (fieldName:string, fieldValue:string) => {
        let fieldNames = new Set(["username", "about", "image"])
        fieldName = fieldName.toLocaleLowerCase().trim() 
        if(fieldNames.has(fieldName))
        {
            if(fieldName === "username")
            {
                var validator = /^((?=.*[A-Za-z])[A-Za-z\d\W]){3,}$/
                if(fieldValue.trim().length === 0)
                    this.setState({usernameAlertMessage: "This field can not be empty"})
                else if(!validator.test(fieldValue.trim()))
                    this.setState({usernameAlertMessage: "This field must contains at least 3 characters"})
                else   
                    this.setState({usernameAlertMessage:"", username : fieldValue})
            }
            else if (fieldName === "about")
            {
                if(fieldValue.trim().length === 0)
                    this.setState({aboutAlertMessage: "This field can not be empty"})
                else if(fieldValue.trim().length === 0)
                    this.setState({aboutAlertMessage: "This field must contains at least 3 characters"})
                else   
                    this.setState({aboutAlertMessage:"", about : fieldValue})
            }
            else if (fieldName === "image")
            {
                
            }
        }
    }

    takePhoto = (event:any) =>
    {

    }

    uploadPhoto = (event:any) =>
    {
        //Create input type file and make it just support image file and simulate 
        //the click the input
        
        var inputFile = document.createElement("input")
        inputFile.setAttribute("type", "file")
        inputFile.setAttribute("accept", "image/*")
        inputFile.click()

        inputFile.onchange = (event) => {
            if((inputFile.files?.length??0) > 0)
            {
                this.setState({dislayUploadImageOptions:false})  
                try {
                    this.props.uploadImage(inputFile.files?.item(0))
                } catch (error) {
                    
                }
            }  
        }
    }

    handleLeave = (fieldName:string, fieldValue:string) =>
    {
        
    }

    displayOrHideUploadImageOption = () => {
        const dislayUploadImageOptions = !this.state.dislayUploadImageOptions
        this.setState({dislayUploadImageOptions})
    }

    render(){
        let styleTextarea = {
            borderColor:(this.state.aboutAlertMessage!=="")?("red"):("black"),
        }
        let styleDiv = {
            // background: `url('./../../../../wwwroot/images/person.png')`
            background: "gray"
        }
        let type = (""+(this.props.alertType??"info")).toLowerCase()
        let textColor = "text-" + ((type === "error")?"danger":type )
        return (
            <form className = "userprofile-form" onSubmit = {this.handleSubmit}>
                <div className="userprofile-image" style = {styleDiv}>
                    <div>
                        <img src={(this.state.dislayUploadImageOptions)?close:camera} alt="select " title = "select or take image" onClick={() => this.displayOrHideUploadImageOption()} />
                        {
                            (this.state.dislayUploadImageOptions)?<div className="userprofile-image-option">
                                <span onClick = {(event) => this.takePhoto(event)}>Take Photo</span>
                                <span onClick = {(event) => this.uploadPhoto(event)}>Upload photo</span>
                            </div>:null
                        }
                    </div>
                </div>
                
                <span className={`form-alert-message ${textColor} fw-bold`}>{this.props.alertMessage}</span>
                <TextFormField fieldType = "text" fieldName = "username" isRequired = {true} placeHolder = "Enter your username" alertMessage = {this.state.aboutAlertMessage} onChange = {this.handleChange} onBlur = {this.handleLeave} key = "profilepage-form-field1" required />
                <span className={(this.state.aboutAlertMessage !== "")?"text-danger":"text-success"}>{this.state.aboutAlertMessage}</span>
                <textarea name="about" style = {styleTextarea} cols={30} rows = {2} minLength={2} maxLength={100} placeholder='Write something about you here' onChange = {(event) => this.handleChange("about",  event.currentTarget.value)}  onBlur = {(event) => this.handleLeave("about", event.currentTarget.value)} value={this.state.about} key = "profilepage-form-field2" required/>
                <SubmitFormButton buttonName = "Save" />
            </form>
        )
    }
}

export default UserProfileForm