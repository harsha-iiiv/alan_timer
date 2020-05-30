import React, { Component } from 'react';
import Display from './Display';
import Keypad from './Keypad';
import Controls from './Controls';
import alanBtn from "@alan-ai/alan-sdk-web";
var sHours, sMin, sSec, sTimer,stopTimer, resumeTimer, resetTimer;
class Timer extends Component {

    constructor(props) {
        super(props);
        this.alanBtnInstance = null;
        this.state = {
            hours: '00',
            minutes: '00',
            seconds: '00',
            unitOfTime: null,
            status: null,
            canStart: null
        };
        sHours = this.handleKeypadClick
        sMin = this.setMinutes
        sSec = this.setSeconds
        sTimer = this.startTimer
        stopTimer = this.handleControlsStop
        resumeTimer = this.handleControlsResume
        resetTimer = this.handleControlsReset
        this.handleDisplayFocusChange = this.handleDisplayFocusChange.bind(this);
        this.handleControlsStart = this.handleControlsStart.bind(this);
        
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    componentDidMount(){
    

    this.alanBtnInstance = alanBtn({
        key:
          "8d733c0d5cd66bdcbfbe1c388e310cbb2e956eca572e1d8b807a3e2338fdd0dc/stage",
        onCommand: function (commandData) {
          if (commandData.command === "setTimer") {
            
            sHours(commandData, 'HH')
           
          }
          if (commandData.command === "startTimer") {
            
            sTimer()
           
          }
          if(commandData.command==='stopTimer'){
              stopTimer()
          }
          if(commandData.command==='resumeTimer'){
            resumeTimer()
        }
        if(commandData.command==='resetTimer'){
            resetTimer()
        }
         
        },  
      });
    }


    // HANDLE DISPLAY


    handleDisplayFocusChange(unitOfTime) {
        this.setState(() => ({ unitOfTime }));
    }


    // HANDLE KEYPAD


    handleKeypadClick = (time, type='HH') => {
        
        if (this.state.unitOfTime === 'HH' || type==='HH') {
            this.setHours(time.hour);
        }if (this.state.unitOfTime === 'MM' || type==='HH') {
            this.setMinutes(time.minutes);
        }if (this.state.unitOfTime === 'SS'  || type==='HH') {
            this.setSeconds(time.seconds);
        }

        this.canStart();
    }

    setHours = (hours) =>{
        if (hours < 0) {
            this.setState(() => ({ hours: '00' }));
        } else {
            this.setState((prevState) => {
                hours = parseInt(this.formatTime(prevState.hours + hours), 10);

                if (hours > 99) {
                    hours = prevState.hours;
                }

                return ({ hours: this.formatTime(hours) });
            });
        }
    }

    setMinutes = (minutes)=> {
        if (minutes < 0) {
            this.setState(() => ({ minutes: '00' }));
        } else {
            this.setState((prevState) => {
                minutes = parseInt(this.formatTime(prevState.minutes + minutes), 10);

                if (minutes < 60) {
                    if (parseInt(minutes.toString()[0], 10) > 5) {
                        minutes = 59;
                    }
                } else if (minutes > 59) {
                    minutes = parseInt(minutes.toString().slice(minutes.toString().length - 1), 10);
                }

                return ({ minutes: this.formatTime(minutes) });
            });
        }
    }

    setSeconds = (seconds)=> {

        if (seconds < 0) {
            this.setState(() => ({ seconds: '00' }));
        } else {
            this.setState((prevState) => {
                seconds = parseInt(this.formatTime(prevState.seconds + seconds), 10);

                if (seconds < 60) {
                    if (parseInt(seconds.toString()[0], 10) > 5) {
                        seconds = 59;
                    }
                } else if (seconds > 59) {
                    seconds = parseInt(seconds.toString().slice(seconds.toString().length - 1), 10);
                }

                return ({ seconds: this.formatTime(seconds) });
            });
        }
    }

    formatTime(time) {
        time = parseInt(time, 10);
        return time < 10 ? '0' + time : time.toString().slice(time.toString().length - 2);
    }


    // HANDLE CONTROLS


    canStart() {

        this.setState((prevState) => ({
            canStart: prevState.status !== 'STARTED' && (parseInt(prevState.hours) > 0
                || parseInt(prevState.minutes, 10) > 0
                || parseInt(prevState.seconds, 10) > 0)
        }));
    }

    handleControlsStart() {
        this.startTimer();
    }

    startTimer = () => {
        if (this.state.status !== 'STARTED') {

            this.setState(() => ({ status: 'STARTED' }));

            const totalMilliseconds = ((parseInt(this.state.hours) * 60 * 60)
                + (parseInt(this.state.minutes, 10) * 60)
                + parseInt(this.state.seconds, 10))
                * 1000;

            this.setState(() => ({ timeInterval: parseInt(totalMilliseconds, 10) }));

            this.interval = setInterval(() => {

                this.setState((prevState) => ({ timeInterval: prevState.timeInterval - 10 }));

                if (this.state.timeInterval === 0) {
                    clearInterval(this.interval);
                    this.setState(() => ({ status: null }));
                }
            }, 10);
        }
    }

    handleControlsStop = ()=> {
        if (this.state.status === 'STARTED') {
            clearInterval(this.interval);
            this.setState(() => ({ status: 'STOPPED' }));
        }
    }

    handleControlsResume = () =>  {
        if (this.state.status === 'STOPPED') {
            this.interval = setInterval(() => {

                this.setState((prevState) => ({
                    status: 'STARTED',
                    timeInterval: prevState.timeInterval - 10 
                }));

                if (this.state.timeInterval === 0) {
                    clearInterval(this.interval);
                    this.setState(() => ({ status: null }));
                }
            }, 10);
        }
    }

    handleControlsReset = () => {
        clearInterval(this.interval);
        this.setState(() => ({ status: null, timeInterval: null }));
    }


    // RENDER


    render() {
        return (
            <div className="timer container">
                <Display onFocusChange={this.handleDisplayFocusChange}
                    hours={this.state.hours}
                    minutes={this.state.minutes}
                    seconds={this.state.seconds}
                    timeInterval={this.state.timeInterval} />

                <Keypad onClick={this.handleKeypadClick} status={this.state.status} />

                <Controls onStart={this.handleControlsStart}
                    onStop={this.handleControlsStop}
                    onResume={this.handleControlsResume}
                    onReset={this.handleControlsReset}
                    canStart={this.state.canStart}
                    status={this.state.status} />
            </div>
        );
    }
}

export default Timer