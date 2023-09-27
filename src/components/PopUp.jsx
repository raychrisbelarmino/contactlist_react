import React, {Component} from "react";
import '../App.css';

class PopUp extends Component{
    constructor(){
        super();
        this.state = {
            operation: 0
        }
        this.formSubmitted = this.formSubmitted.bind(this);
        this.closePopUp = this.closePopUp.bind(this);
    }

    closePopUp(){
        this.props.popUpActs(true);
    }

    formSubmitted(e){
        alert(this.state.operation);
        e.preventDefault();
    }

    render(){
        return(
            <div style={{position: 'relative', width: 'inherit', height: 'inherit'}}>
                <div id="transparentGrayBG" onClick={this.closePopUp}>
                </div>
                <div id="modal">
                <center>
                    <br/>
                    <h2 style={{margin: '0px'}}>Contact</h2><br/>
                    <form id="modalForm" onSubmit={()=>this.formSubmitted(event)}>
                    <input required maxLength="50" name="lname" id="lname" placeholder="Last name" className="inputFields"/><br/>
                    <input required maxLength="50" name="fname" id="fname" placeholder="First name" className="inputFields"/><br/>
                    <input required maxLength="50" name="emailAdd" id="emailAdd" type="email" placeholder="Email address" className="inputFields"/><br/>
                    <input required maxLength="15" name="contactNum" id="contactNum" type="tel" placeholder="Contact number" className="inputFields"/><br/>
                    <button id="btnName" type="submit">Submit</button>
                    </form>
                </center>
                </div>
            </div>
        );
    }
}

export default PopUp;