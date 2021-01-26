import React from 'react'
import Backdrop from '../Backdrop/Backdrop'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import classes from './Modal.module.css'
import { Component } from 'react'
import Aux from '../../../hoc/Auxiliary/Auxiliary'
class Modal extends Component {
    state = {
        validUserName: false,
        validPassword: false
    }

    checkValid = (event, type) => {
        if(event.target.value.length <= 6 || event.target.value.length >= 30){
            if(type === "UserName"){
                this.setState({validUserName: false})
            }
            if(type === "Password"){
                this.setState({validPassword: false})
            }
        }
        else if(!/^[A-Za-z0-9 ]+$/.test(event.target.value) || /\s/g.test(event.target.value)){
            if(type === "UserName"){
                this.setState({validUserName: false})
            }
            if(type === "Password"){
                this.setState({validPassword: false})
            }
        }
        else {
            if(type === "UserName"){
                this.setState({validUserName: true})
            }
            if(type === "Password"){
                this.setState({validPassword: true})
            }
        }
    }

    render(){
        return (
            <Aux>
                <div className = {classes.Modal}>
                    <div style = {{float: "left"}}>Username:</div>
                    <InputGroup size = "lg">
                        <FormControl  
                        style = {{
                            borderColor: this.state.validUserName ?  null : "red"
                        }}
                        placeholder = "Username" aria-label="Large" aria-describedby="inputGroup-sizing-sm" 
                        onChange = {(event) => this.checkValid(event, 'UserName')}/>
                    </InputGroup>
                    <br></br>
                    <br></br>
                    <div style = {{float: "left"}}>Password:</div>
                    <InputGroup size = "lg">
                        <FormControl 
                        style = {{
                            borderColor: this.state.validPassword ?  null : "red"
                        }} 
                        placeholder = "Password" aria-label="Large" aria-describedby="inputGroup-sizing-sm" 
                        onChange = {(event) => this.checkValid(event, 'Password')}/>
                    </InputGroup>
                    <br></br>
                    <br></br>
                    <Button className = {classes.Button} onClick = {this.props.modalClose} disabled = {!this.state.validPassword || !this.state.validUserName}>Login</Button>
                </div>

                <Backdrop show = {this.props.show} close = {this.props.modalClose}/>
            </Aux>
            
        )
    }
}

export default Modal