import { Component } from "react";

import defaultImage from './../../../../../wwwroot/images/avatar.png'
import menu from "./../../../../../wwwroot/images/menu_horizontal_dark.png"
import ProfileUserMenu from '../ProfileUserMenu/ProfileUserMenu';
import "./Profile.css"

class Profile extends Component{

    props:any =  this.props
    image = defaultImage
    state = {
        menuIsOpen: false
    }
    openUserMenu = (event:any) => {
        var menuIsOpen = !this.state.menuIsOpen
        if(menuIsOpen)
        {
            try {this.props.openMenu(event)} catch (error) {}
        }
        this.setState({menuIsOpen})
    }

    render(){
        let {name} = this.props.userData
        return (
            <div className = "profile">
                <span className="username">Hi, {name}</span>
                 <img src={this.image} className="userimage rounded-circle" alt={"name" + name} />
                <div>
                    <div className="menu-icon" onClick = {this.openUserMenu}><img src={menu} alt="" /></div>
                    {(this.state.menuIsOpen)?<ProfileUserMenu />:null}
                </div>
            </div>
        )
    }
}

export default Profile