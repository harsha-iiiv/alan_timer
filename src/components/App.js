import React, { Component } from "react";
import { connect } from "react-redux";
import {Redirect} from "react-router-dom"
import { addReminder, deleteReminder, clearReminders, delLastReminder } from "../actions";
import alanBtn from "@alan-ai/alan-sdk-web";
var adReminder, delReminder, clrReminders, lReminder, goTimerpage;
class App extends Component {
  constructor(props) {
    super(props);
    this.alanBtnInstance = null;
    adReminder = this.addReminder
    delReminder = this.deleteReminder
    clrReminders = this.removeR
    lReminder = this.LReminder
    goTimerpage = this.goTimer
    this.state = {
      text: "",
      dueDate: "",
      direct: false
    };

  }

  goTimer = () => {
    this.setState({direct:true})
  }
  LReminder = ()=>{
    this.props.delLastReminder();
  }
  removeR = ()=>{
    this.props.clearReminders()
  }
  addReminder=(text, time) =>{
    console.log(time)
  if(this.state.dueDate==="" && this.state.text==="")

  this.props.addReminder(text, time);
  else{
  this.props.addReminder(this.state.text, this.state.dueDate);
  }


}
deleteReminder=(id)=> {
  this.props.deleteReminder(id);
}
  componentDidMount() {
    this.alanBtnInstance = alanBtn({
      key:
        "8d733c0d5cd66bdcbfbe1c388e310cbb2e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: function (commandData) {
        if (commandData.command === "setReminder") {
          adReminder(commandData.text, commandData.time);
          // Handling the address command
        }
        if(commandData.command==='delReminder'){
          delReminder(commandData.text);
        }
        if(commandData.command==='clrReminders'){
          clrReminders();
        }
        if(commandData.command==='lReminder'){
          lReminder();
        }
        if(commandData.command==='goTimerpage'){
          goTimerpage()
        }
      },  
    });
  }

  

  

  renderReminders() {
    const { reminders } = this.props;
    return (
      <ul className="list-group   card-body">
        {reminders.map((reminder) => {
          return (
            <li key={reminder.text} className="list-group-item">
              <div className="list-item">
                <div>{reminder.text}</div>
                <div>
                  <em>{reminder.dueDate}</em>
                </div>
              </div>
              <div
                className="list-item delete-button"
                onClick={() => this.deleteReminder(reminder.text)}
              >
                <button>&#x2715;</button>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    if (this.state.direct) {
      return <Redirect exact to='/timer' />
    }
    return (
      <div className="container timer">
        <div className="title">Reminder Pro</div>
        <div className="form-inline reminder-form test ">
          <div className="form-group display">
            <input
              className="form-control"
              placeholder="I have to..."
              onChange={(event) => this.setState({ text: event.target.value })}
            />
            <input
              className="form-control"
              type="datetime-local"
              onChange={(event) =>
                this.setState({ dueDate: event.target.value })
              }
            />
          </div>
          <button
            className='btn-add'
            type="button"
            className="btn btn-success"
            onClick={() => this.addReminder()}
          >
            Add Reminder
          </button>
        </div>
        {this.renderReminders()}
        <div
          className="btn btn-danger"
          onClick={() => this.props.clearReminders()}
        >
          Clear All Reminders
        </div>
      
        
        </div>
    );
  }
}

function mapsStateToProps(state) {
  return {
    reminders: state
  }
}

export default connect(mapsStateToProps, {
  addReminder,
  deleteReminder,
  clearReminders,
  delLastReminder
})(App);
