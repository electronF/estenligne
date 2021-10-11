import { ReactElement } from "react"
import "./PageName.css"

const PageName = (props:any):ReactElement => {
    return <span className="page-tile">
        {props.name}
    </span>
}

export default PageName
