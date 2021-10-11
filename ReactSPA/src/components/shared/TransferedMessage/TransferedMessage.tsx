import { Component } from 'react'

import transferedIcon from "../../../wwwroot/images/shared_dark_black.png"
import "./TransferedMessage.css"


class TransferedMessage extends Component {
    props:any = this.props
    render() {
        var {message} = this.props
        return (
            <div className="transfered-message">
                <div>
                    <img src={transferedIcon} alt="" />
                    <span>transfered</span>
                </div>
                <span> {message??"Transfered message"} </span>
            </div>
        )
    }
}

export default  TransferedMessage