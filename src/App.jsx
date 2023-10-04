import './App.css'
import React, {Component} from 'react'
import PopUp from './components/PopUp.jsx';
import $ from 'jquery';

class App extends Component{
  constructor(){
    super();
    this.state = {
      data: [],
      hidePopUp: true,
      operation: 0,
      contact: {}
    }
    this.popUpActs = this.popUpActs.bind(this);
    this.submitContact = this.submitContact.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
  }

  popUpActs(val, action = 0){//1-add,2-edit
    this.setState({
      hidePopUp: val,
      operation: action
    })
  }

  deleteContact(id){
    if (confirm('Are you sure you want to delete this contact?')) {
      var self = this;
      $.ajax({
        type : 'POST',
        url : 'https://todolist-sample.000webhostapp.com/delete.php',
        //url : 'http://localhost/ContactListBackendPHP/delete.php',
        data : "id="+id,
        success : function(response) {
          var res = JSON.parse(response);
          alert(res["message"]);
          if(res["status"] == 200){
            var arr = self.state.data;
            const itemToRemoveIndex = arr.findIndex(function(item) {
              return item.id === id;
            });
            if(itemToRemoveIndex !== -1){
              arr.splice(itemToRemoveIndex, 1);
            }
            self.setState({
              data: arr
            })
          }
        }
      });
    } else {
      // Do nothing!
    }
  }

  submitContact(lname, fname, emailAdd, contactNum){
    var self = this;
    this.popUpActs(true);
    const obj = {
      lname,
      fname,
      emailAdd,
      contactNum
    }
    let data = new URLSearchParams(obj).toString();
    //jquery needed
    $.ajax({
      type : 'POST',
      url : 'https://todolist-sample.000webhostapp.com/add.php',
      //url : 'http://localhost/ContactListBackendPHP/add.php',
      data : data,
      success : function(response) {
        var res = JSON.parse(response);
        alert(res["message"]);
        if(res["status"] == 200 && res["data"] != -1){
          const newObj = {
            id: res["data"],
            lastName: lname,
            firstName: fname,
            email: emailAdd,
            number: contactNum
          }
          var arr = self.state.data;
          arr.push(newObj);

          //sort according to last name

          self.setState({
            data: arr
          })
        }
      }
    });
  }

  componentDidMount(){
    var self = this;
    var contactsData;
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://todolist-sample.000webhostapp.com/read.php", true);
    //xhttp.open("GET", "http://localhost/ContactListBackendPHP/read.php", true);
    xhttp.send();
    xhttp.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        contactsData = JSON.parse(this.responseText);
        var arr = [];
        for(var x = 0; x < contactsData.count; x++){
          arr.push(contactsData.data[x]);
        }
        self.setState({
          data: arr
        })
      }
    };
  }

  render(){
    return(
      <div style={{position: 'relative', width: '100%', height: '100vh'}}>
        <div id="contactList" style={{width: '100%', position: 'absolute'}}>
            <center><h1>Contact List</h1></center>
            <table id="contactTable" border="1" style={{width: '100%', border: '1px solid black'}}>
              <thead>
                <tr>
                    <th>ID</th>
                    <th>LAST NAME</th>
                    <th>FIRST NAME</th>
                    <th>EMAIL ADDRESS</th>
                    <th>CONTACT NUMBER</th>
                    <th style={{width: '100px'}}></th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.data.map((item)=>{
                    return(
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.lastName}</td>
                      <td>{item.firstName}</td>
                      <td>{item.email}</td>
                      <td>{item.number}</td>
                      <td>
                        <button style={{backgroundColor: 'green'}} className='actionButtons'>EDIT</button>
                        <button style={{backgroundColor: 'red'}} className='actionButtons' onClick={()=>this.deleteContact(item.id)}>DELETE</button>
                      </td>
                    </tr>);
                  })
                }
              </tbody>
            </table>
            <br/>
            <button style={{float: 'right', fontSize: '16px'}} onClick={()=>this.popUpActs(false, 1)}>ADD CONTACT</button>
            <br/><br/>
        </div>
        <div hidden={this.state.hidePopUp} id="addContactPopup" style={{width: '100%', height: '100vh', position: 'absolute'}}>
          <PopUp popUpActs={this.popUpActs} submitContact={this.submitContact}/>
        </div>

      </div>
    );
  }
}

export default App
