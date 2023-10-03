import React, {Component} from "react";
import '../App.css';

class PopUp extends Component{
    constructor(){
        super();
        this.state = {
            lname: '',
            fname: '',
            emailAdd: '',
            contactNum: ''
        }
        this.formSubmitted = this.formSubmitted.bind(this);
        this.closePopUp = this.closePopUp.bind(this);
        this.inputValueChanged = this.inputValueChanged.bind(this);
    }

    closePopUp(){
        this.props.popUpActs(true);
    }

    inputValueChanged = tags => (event) =>{
        switch(tags){
            case 'lname':
                this.setState({lname: event.target.value})
                break;
            case 'fname':
                this.setState({fname: event.target.value})
                break;
            case 'emailAdd':
                this.setState({emailAdd: event.target.value})
                break;
            case 'contactNum':
                this.setState({contactNum: event.target.value})
                break;
            default:
                break;
        }
    }

    formSubmitted(e){
        this.props.submitContact(this.state.lname, this.state.fname, this.state.emailAdd, this.state.contactNum);
        this.setState({
            lname: '',
            fname: '',
            emailAdd: '',
            contactNum: ''
        })
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
                        <input required maxLength="50" value={this.state.lname} name="lname" id="lname" 
                            onChange={this.inputValueChanged("lname")} placeholder="Last name" className="inputFields"/><br/>
                        <input required maxLength="50" value={this.state.fname} name="fname" id="fname"
                            onChange={this.inputValueChanged("fname")} placeholder="First name" className="inputFields"/><br/>
                        <input required maxLength="50" value={this.state.emailAdd} name="emailAdd" id="emailAdd" 
                            onChange={this.inputValueChanged("emailAdd")} type="email" placeholder="Email address" className="inputFields"/><br/>
                        <input required maxLength="15" value={this.state.contactNum} name="contactNum" id="contactNum" 
                            onChange={this.inputValueChanged("contactNum")} type="tel" placeholder="Contact number" className="inputFields"/><br/>
                    <button id="btnName" type="submit">Submit</button>
                    </form>
                </center>
                </div>
            </div>
        );
    }
}

export default PopUp;