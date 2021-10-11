import { Component } from 'react'

import login from "../../../../../wwwroot/images/person_dark.png";
import logout from "../../../../../wwwroot/images/logout.png";
import "./ProfileUserMenu.css"

class ProfileUserMenu extends Component {
    props:any = this.props
    render() {
        return (
            <div className = "profile-menu">
                <div>
                    <img src ={login} alt ="login" className="col col-sm-3" />
                    <span className="col col-sm-9"> Profile </span>
                </div>
                <div>
                    <img src={logout} alt ="logout" className="col col-sm-3" />
                    <span className="col col-sm-9"> Logout </span>
                </div>
            </div>
        )
    }
}


export default ProfileUserMenu