import React, {Component} from 'react'
import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import {Button} from 'react-bootstrap'
import classes from './Inputs.module.css'
import {connect} from 'react-redux'

import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
class Inputs extends Component {
    state = {
        sleepTime: "",
        wakeTime: "",
        button1: "AM",
        button2: "AM",
        colonChecker: false,
        invalidInput: false
    }

    toggleButtonHandler = (value) => {
        if(value === 1){
            if(this.state.button1 === "AM"){
                this.setState({button1: "PM"})
            }
            else{
                this.setState({button1: "AM"})
            }
        }
        else{
            if(this.state.button2 === "AM"){
                this.setState({button2: "PM"})
            }
            else{
                this.setState({button2: "AM"})
            }
        }
    }

    checkValidInputAuto = (event, time) => {
        if(event.target.value.length <= 5 
            && (/^[0-9\b]+$/.test(event.target.value) 
            || event.target.value === "" 
            || ((event.target.value[2] === ":" && this.state.colonChecker) && (/^[0-9\b]+$/.test(event.target.value[4]) || event.target.value[4] === undefined)))){
            if(time === "wake"){
                if(this.state.wakeTime.length === 2 && 
                    event.nativeEvent.inputType === "insertText"){
                    this.setState({wakeTime: event.target.value.slice(0,2) + ":" + event.target.value[2], colonChecker: true})
                }
                else if(this.state.wakeTime.length === 4 && 
                    event.nativeEvent.inputType === "deleteContentBackward"){
                    this.setState({wakeTime: event.target.value.slice(0,2), colonChecker: false})
                }
                else{
                    this.setState({wakeTime: event.target.value})
                }

            } 

            else{
                if(this.state.sleepTime.length === 2 && 
                    event.nativeEvent.inputType === "insertText"){
                    this.setState({sleepTime: event.target.value.slice(0,2) + ":" + event.target.value[2], colonChecker: true})
                }
                else if(this.state.sleepTime.length === 4 && 
                    event.nativeEvent.inputType === "deleteContentBackward"){
                    this.setState({sleepTime: event.target.value.slice(0,2), colonChecker: false})
                }
                else{
                    this.setState({sleepTime: event.target.value})
                }
            }
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
            this.setState({invalidInput: true, sleepTime: "", wakeTime: "", colonChecker: false})
            return 
        }
        else if(this.state.sleepTime.length !== 5 || this.state.wakeTime.length !== 5){
            this.setState({invalidInput: true, sleepTime: "", wakeTime: "", colonChecker: false})
            return
        }
        let sleepTimeValue = this.convertTimeToNum(this.state.sleepTime)
        let wakeTimeValue = this.convertTimeToNum(this.state.wakeTime)
        if(sleepTimeValue.minute >= 60 ||  wakeTimeValue.minute >= 60){
            this.setState({invalidInput: true, sleepTime: "", wakeTime: "", colonChecker: false})
            return
        }
        else if(this.props.timeSettings === "Military" && 
        (sleepTimeValue.hours >= 24 ||  wakeTimeValue.hours >= 24)){
            this.setState({invalidInput: true, sleepTime: "", wakeTime: "", colonChecker: false})
            return
        }
        else if(this.props.timeSettings === "Regular" && 
        ((sleepTimeValue.hours === 0 || sleepTimeValue.hours > 12) || 
        (wakeTimeValue.hours === 0 || wakeTimeValue.hours > 12))){
            this.setState({invalidInput: true, sleepTime: "", wakeTime: "", colonChecker: false})
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
                        <InputGroup size = "lg">
                            <FormControl value = {this.state.sleepTime} onChange = {event => this.checkValidInputAuto(event, "sleep")} placeholder = "12:00" aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
                            <DropdownMenu/>
                            <Button disabled = {this.props.timeSettings === "Military"} onClick = {() => this.toggleButtonHandler(2)}>{this.state.button2}</Button>
                        </InputGroup>
                        
                    </Col>
    
                    <Col>
                        Wakeup Time
                        <InputGroup size = "lg">
                            <FormControl value = {this.state.wakeTime} onChange = {event => this.checkValidInputAuto(event, "wake")} placeholder = "12:00" aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
                            <Button disabled = {this.props.timeSettings === "Military"} onClick = {() => this.toggleButtonHandler(1)}>{this.state.button1}</Button>
                        </InputGroup>
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