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
        button2: "PM"
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

    checkValidInput = (event, time) => {
        console.log(event.target.value[4])
        if(event.target.value.length <= 5 
            && (/^[0-9\b]+$/.test(event.target.value) 
            || event.target.value === "" 
            || (event.target.value[2] === ":" && (/^[0-9\b]+$/.test(event.target.value[4]) || event.target.value[4] === undefined)))){
            if(time === "wake"){
                if(this.state.wakeTime.length === 2 && 
                    event.nativeEvent.inputType === "insertText"){
                    this.setState({wakeTime: event.target.value.slice(0,2) + ":" + event.target.value[2]})
                }
                else if(this.state.wakeTime.length === 4 && 
                    event.nativeEvent.inputType === "deleteContentBackward"){
                    this.setState({wakeTime: event.target.value.slice(0,2)})
                }
                else{
                    this.setState({wakeTime: event.target.value})
                }

            } 

            else{
                if(this.state.sleepTime.length === 2 && 
                    event.nativeEvent.inputType === "insertText"){
                    this.setState({sleepTime: event.target.value.slice(0,2) + ":" + event.target.value[2]})
                }
                else if(this.state.sleepTime.length === 4 && 
                    event.nativeEvent.inputType === "deleteContentBackward"){
                    this.setState({sleepTime: event.target.value.slice(0,2)})
                }
                else{
                    this.setState({sleepTime: event.target.value})
                }
            }
        }
        
    }
    render(){
        return(
            <Container>
                <h2>Today's Times</h2>
                <br></br>
                <Row>
                    <Col>
                        Wakeup Time
                        <InputGroup size = "lg">
                            <FormControl value = {this.state.wakeTime} onChange = {event => this.checkValidInput(event, "wake")} placeholder = "12:00" aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
                            <Button disabled = {this.props.timeSettings === "Military"} onClick = {() => this.toggleButtonHandler(1)}>{this.state.button1}</Button>
                        </InputGroup>
                    </Col>
    
                    <Col>
                        Sleep Time
                        <InputGroup size = "lg">
                            <FormControl value = {this.state.sleepTime} onChange = {event => this.checkValidInput(event, "sleep")} placeholder = "12:00" aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
                            <DropdownMenu/>
                            <Button disabled = {this.props.timeSettings === "Military"} onClick = {() => this.toggleButtonHandler(2)}>{this.state.button2}</Button>
                        </InputGroup>
                    </Col>
                </Row>
                <br></br>
                
                <Button  onClick = {() => this.props.onAddTime(this.state)} className = {classes.Button}size = "lg" variant = "success">Save Times</Button>
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