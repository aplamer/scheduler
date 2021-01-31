import React, {Component} from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import {Button} from 'react-bootstrap'

class Input extends Component {
    state = {
        button: "AM",
        colonChecker: false
    }

    toggleButtonHandler = () => {
        if(this.props.button === "AM"){
            this.props.buttonHandler("PM", this.props.value)
        }
        else{
            this.props.buttonHandler("AM", this.props.value)
        }
    }

    checkValidInputAuto = (event) => {
        if(event.target.value.length <= 5 
            && (/^[0-9\b]+$/.test(event.target.value) 
            || event.target.value === "" 
            || ((event.target.value[2] === ":" && this.state.colonChecker) && (/^[0-9\b]+$/.test(event.target.value[4]) || event.target.value[4] === undefined)))){
                if(this.props.time.length === 2 && 
                    event.nativeEvent.inputType === "insertText"){
                    this.props.inputHandler(event.target.value.slice(0,2) + ":" + event.target.value[2], this.props.value);
                    this.setState({colonChecker: true})
                }
                else if(this.props.time.length === 4 && 
                    event.nativeEvent.inputType === "deleteContentBackward"){
                    this.props.inputHandler(event.target.value.slice(0,2), this.props.value)
                    this.setState({colonChecker: false})
                }
                else{
                    this.props.inputHandler(event.target.value, this.props.value)
                }
        }
        
    }
    render() { 
        return (
            <InputGroup size = "lg">
                <FormControl value = {this.props.time} onChange = {event => this.checkValidInputAuto(event)} placeholder = "12:00" aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
                <Button disabled = {this.props.settings === "Military"} onClick = {this.toggleButtonHandler}>{this.props.button}</Button>
            </InputGroup>
        )
    }
}

export default Input