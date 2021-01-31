import React, {Component} from 'react'
import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import {Button} from 'react-bootstrap'
import classes from './Inputs.module.css'
import {connect} from 'react-redux'
import Input from './Input/Input'
class Inputs extends Component {
    state = {
        sleepTime: "",
        wakeTime: "",
        button1: "AM",
        button2: "AM",
        invalidInput: false
    }
    inputChangeHandler = (newTime, value) => {
        if(value === "sleep"){
            this.setState({sleepTime: newTime})
        }
        else if(value === "wake"){
            this.setState({wakeTime: newTime})
        }
    }

    buttonChangeHandler = (newAMorPM, value) => {
        if(value === "sleep"){
            this.setState({button1: newAMorPM})
        }
        else if(value === "wake"){
            this.setState({button2: newAMorPM})
        }
    }

    convertTimeToNum = (time) => {
        return {
            hours: parseInt(time.slice(0,2)),
            minute: parseInt(time.slice(3,5))
        }
    }

    checkValidInput = () => {
        if(this.state.sleepTime === "" || this.state.wakeTime.length === ""){
            this.setState({invalidInput: true})
            return 
        }
        else if(this.state.sleepTime.length !== 5 || this.state.wakeTime.length !== 5){
            this.setState({invalidInput: true})
            return
        }
        let sleepTimeValue = this.convertTimeToNum(this.state.sleepTime)
        let wakeTimeValue = this.convertTimeToNum(this.state.wakeTime)
        if(sleepTimeValue.minute >= 60 ||  wakeTimeValue.minute >= 60){
            this.setState({invalidInput: true})
            return
        }
        else if(this.props.timeSettings === "Military" && 
        (sleepTimeValue.hours >= 24 ||  wakeTimeValue.hours >= 24)){
            this.setState({invalidInput: true})
            return
        }
        else if(this.props.timeSettings === "Regular" && 
        ((sleepTimeValue.hours === 0 || sleepTimeValue.hours > 12) || 
        (wakeTimeValue.hours === 0 || wakeTimeValue.hours > 12))){
            this.setState({invalidInput: true})
            return
        }
        else{ 
            this.setState({invalidInput: false})
            this.props.onAddTime(this.state);
        }
    }

    render(){
        let invalidMessage = null;
        if(this.state.invalidInput === true){
            invalidMessage = <p style = {{color: 'red', fontWeight: 'bold'}}>Invalid Input: Please follow military or regular time depending on your settings.</p>
        }
        return(
            <Container>
                <h2>Today's Times:</h2>
                {invalidMessage}
                {this.state.invalidInput ? null : <br></br>}
                <Row>
                    <Col>
                        Sleep Time
                        <Input 
                        inputHandler = {this.inputChangeHandler}
                        buttonHandler = {this.buttonChangeHandler}
                        value = "sleep" 
                        time = {this.state.sleepTime} 
                        settings = {this.props.timeSettings}
                        button = {this.state.button1}/>
                        
                    </Col>
    
                    <Col>
                        Wakeup Time
                        <Input 
                        inputHandler = {this.inputChangeHandler}
                        buttonHandler = {this.buttonChangeHandler}
                        value = "wake" 
                        time = {this.state.wakeTime} 
                        settings = {this.props.timeSettings}
                        button = {this.state.button2}/>
                    </Col>
                </Row>
                <br></br>
                
                <Button  onClick = {this.checkValidInput} className = {classes.Button}size = "lg" variant = "success">Save Times</Button>
                <hr></hr>
    
            </Container>
           
        )
    }
    
}

const mapStateToProps = state => {
    return {
        times: state.Times,
        score: state.sleepScore,
        timeSettings: state.timeSettings
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddTime: (savedTime) => dispatch({type: "ADD", id: new Date().toString(), value: savedTime}),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Inputs);