import { Component } from 'react'

import "./TaggedMessage.css"

class TaggedMessage extends Component {
    props:any = this.props

    render() {
        return (
            <div className="TaggedMessage">
                <div >
                    <span className ="user-name">username</span>
                    <div className = "description">
                        <img src="" alt="" />
                        <span>Mon message est super cool genial machin truc chose chouette cool genial super ok cool cool machin truc chose okey okey</span>
                    </div>
                </div>
                <img src="" alt="" />
            </div>
        )
    }
}

export default TaggedMessage