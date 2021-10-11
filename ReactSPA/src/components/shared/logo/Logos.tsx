import logo from "./../../../wwwroot/images/logo.png"
import "./Logos.css"

function VerticalLogo(){
        return (
            <div className="vertical-logo">
                <img src={logo} className="vertical-logo-image" alt="logo"/>
                <span className="vertical-logo-title">EstEnLigne</span>
            </div>
        )
}

function HorizontalLogo(){
    return(
        <div className="horizontal-logo">
            <img src={logo} className="horizontal-logo-image" alt="logo"/>
            <span className="horizontal-logo-title">EstEnLigne</span>
        </div> 
    )
}

export {VerticalLogo, HorizontalLogo}