import { Component } from 'react'

import "./SpinnerProgress.css"

class SpinnerProgress extends Component {
    props:any = this.props
    render() {
        var {size, message, textInside, textSize, textRotate} = this.props
        size = size??1
        message = message??""
        textInside = textInside??false 
        textRotate = textRotate??false
        return (
            <div className="spinner-progress">
                {
                    (textRotate===true)?
                    <div className={`spinner spinner-${size}`}> <span className={textSize}> {message} </span></div>
                    :
                    <><div className={`spinner spinner-${size}`}></div><span className={`${textInside?"inside":""} ${textSize}`}>{message}</span></>
                }
            </div>
        )
    }
}

export default SpinnerProgress