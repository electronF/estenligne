import { Component } from "react";
import Profile from "./Profile/Profile";

import { HorizontalLogo } from "../../../shared/logo/Logos";
import ProfileUserMenu from './ProfileUserMenu/ProfileUserMenu';

import "./Head.css";

class Head extends Component
{
    props:any = this.props
    state = {
        displayReceiverInformation : false,
        senderProfile : {},
        receiverProfile : {}
    }

    openMenu = (event:any) => {
    //    console.log(event)
    }

    render(){
        let {displayReceiverInformation, receiverProfile, senderProfile} = this.props
        return (
            <div className="homepage-head">
                {
                    ((displayReceiverInformation !== true)?
                    (<div className = "logo-information"> <HorizontalLogo /> </div>):(null))    
                }
                <div className = "sender-information"><Profile userData = {senderProfile} openMenu = {this.openMenu}/></div>
                {
                    (displayReceiverInformation ===  true)?
                    <div className = "receiver-information"><Profile userData = {receiverProfile} openMenu = {this.openMenu} /></div>: null
                }
            </div>
        )
    }
}

export default Head