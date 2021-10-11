import "./SubmitFormButton.css"

function SubmitFormButton(props:any) {
    return (<div className = "form-group row">
        <div className = "col-sm-12">    
            <input type="submit" className="btn btn-dark col-sm-12 lh-1p9 fs-6 fw-bold" value = {props.buttonName} />
        </div>
    </div>)
}

export default SubmitFormButton
