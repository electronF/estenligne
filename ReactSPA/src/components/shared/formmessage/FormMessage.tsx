import "./FormMessage.css"

function FormMessage(props:any) {
        let type = (""+(props.type??"info")).toLowerCase()
        let textColor = "text-" + ((type === "error")?"danger":type )
        return (<span className={`form-alert-message ${textColor} fw-bold`}>{props.message}</span>)
}

export default FormMessage