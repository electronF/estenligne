import { Component } from "react";

// import person from "./.././../../../../../../wwwroot/images/person.png";
import people1 from "./.././../../../../../../wwwroot/images/people_bw.png";
import { formatDate } from "../../../../../../shared/utils/functions";
// import people2 from "./.././../../../../../../wwwroot/images/people_skin.png";

import "./Conversation.css"

class Conversation extends Component {
    props:any = this.props
    

    render() {
        const {image, name, datetime, unreads, message, status, email, id} = this.props.data;
        return (
            <div className="conversation" key={`${email}${id}`} onClick = {this.props.onClick}>
                <div className="image"><img src={image??people1} title={name} alt={`${name}`} /></div>
                <div className = "description">
                    <div className="description-top">
                        <span className="destinator">{(`${name}`.substring(0, 17)) + ((`${name}`.length>17)?"...":"")}</span>
                        <div>
                            <span className="datetime">{formatDate(datetime)}</span>
                            {(unreads > 0)?<span className="unreads">{unreads}</span>:null}
                        </div>
                    </div>
                    <div className="description-bottom">
                        <span className="message">{(`${message}`.substring(0, 40)) + ((`${message}`.length>40)?"...":"")}</span>
                        <span className="status">{status}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Conversation
