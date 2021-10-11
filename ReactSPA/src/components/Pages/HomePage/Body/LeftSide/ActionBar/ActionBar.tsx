import { Component} from "react";

import search from "./../../../../../../wwwroot/images/search.png"
import menu from "./../../../../../../wwwroot/images/menu_horizontal.png"

import "./ActionBar.css"

class ActionBar extends Component{

    state = {
        fieldValue:""
    }

    handleChange = (event:any) => {
        this.setState({fieldValue: event.currentTarget.value??""})
    }

    handleGetFocus = (event:any) =>{
        let classList = event.currentTarget.classList
        if(classList.contains("text-center"))
            classList.remove("text-center")
    }

    handleLostFocus = (event:any) =>{
        let fieldValue = this.state.fieldValue.trim(); 
        if(fieldValue.length === 0)
        {
            this.setState({fieldValue})
            let classList = event.currentTarget.classList
            if(!classList.contains("text-center"))
                classList.add("text-center")
        }
    }


    render() {
        return (
            <div className="action-bar col col-sm-12">
                <div className="search-icon"> <label htmlFor="search-field"><img src={search} alt="" /></label> </div>
                <div className="col col-sm-8 search-field"><input type="text" id="search-field" className="form-control text-center" onFocus={this.handleGetFocus} onBlur = {this.handleLostFocus} onChange={this.handleChange} value={this.state.fieldValue} placeholder="Search discussion here" /></div>
                <div className="menu-icon"><img src={menu} alt="" /></div>
            </div>
        )
    }
}

export default ActionBar