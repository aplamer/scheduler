import React from 'react'
import Backdrop from '../../components/UI/Backdrop/Backdrop'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import classes from './Login.module.css'
import { Component } from 'react'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import {connect} from 'react-redux'

class Login extends Component {
    state = {
        validEmail: false,
        validPassword: false,
        Email: "",
        password: "",
        signingUp: false
    }

    toggleSignup = event => {
        event.preventDefault()
        this.setState(prevState => {
            return {signingUp: !prevState.signingUp}
        })
    }
    checkValid = (event, type) => {
        if(event.target.value.length <= 6 || event.target.value.length >= 30){
            if(type === "Email"){
                this.setState({validEmail: false})
            }
            if(type === "Password"){
                this.setState({validPassword: false})
            }
        }
        else if(type === "Email" && 
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(event.target.value.toLowerCase())){
            this.setState({validEmail: false})
        }
        else if( type === "Password" && 
        (!/^[A-Za-z0-9 ]+$/.test(event.target.value) || /\s/g.test(event.target.value))){
            this.setState({validPassword: false})
        }
        else {
            if(type === "Email"){
                this.setState({Email: event.target.value, validEmail: true})
            }
            if(type === "Password"){
                this.setState({password: event.target.value, validPassword: true})
            }
        }
    }

    onSignUpHandler = event => {
        event.preventDefault();
        this.props.onAuthSignup(this.state.Email, this.state.password)
    }

    onLoginHandler = event => {
        event.preventDefault();
        this.props.onAuthLogin(this.state.Email, this.state.password)
    }
    render(){
        let button = null
        if(this.state.signingUp){
            button = 
            <Aux>
                <Button 
                    onClick = {(event) => this.onSignUpHandler(event)} 
                    className = {classes.Button} 
                    disabled = {!this.state.validPassword || !this.state.validEmail}>
                        Sign Up  
                </Button>
                <br></br>
                <Button 
                className = {classes.Link}
                onClick = {(event) => this.toggleSignup(event)}>
                    Already have an account? Log In here!
                </Button>
            </Aux>
        }
        else{
            button = 
            <Aux>
                <Button 
                    onClick = {(event) => this.onLoginHandler(event)} 
                    className = {classes.Button} 
                    disabled = {!this.state.validPassword || !this.state.validEmail}>
                        Log In 
                </Button>
                <br></br>
                <Button
                className = {classes.Link}
                onClick = {(event) => this.toggleSignup(event)}>
                    Don't have an account yet? Sign Up here!
                </Button>
            </Aux>
        }
        return (
            <Aux>
                <div className = {classes.Modal}>
                        <div style = {{float: "left"}}>Email:</div>
                        <InputGroup size = "lg">
                            <FormControl  
                            style = {{
                                borderColor: this.state.validEmail ?  null : "red"
                            }}
                            placeholder = "Email" aria-label="Large" aria-describedby="inputGroup-sizing-sm" 
                            onChange = {(event) => this.checkValid(event, 'Email')}/>
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
                        {button}
                </div>

                <Backdrop show = {this.props.show} close = {this.props.modalClose}/>
            </Aux>
            
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onAuthSignUp: (email, password) => dispatch({type: "AUTH_SIGNUP", email: email, password: password}),
        onAuthLogin: (email, password) => dispatch({type: "AUTH_LOGIN", email: email, password: password})
    };
};
export default connect(null, mapDispatchToProps)(Login)