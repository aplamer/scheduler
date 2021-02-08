import React from 'react'
import Backdrop from '../../components/UI/Backdrop/Backdrop'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import classes from './Login.module.css'
import { Component } from 'react'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import {connect} from 'react-redux'
import axios from 'axios'
class Login extends Component {
    state = {
        validEmail: false,
        validPassword: false,
        email: "",
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
                this.setState({email: event.target.value, validEmail: true})
            }
            if(type === "Password"){
                this.setState({password: event.target.value, validPassword: true})
            }
        }
    }

    signupHelper = (response) => {
        const newState = {
            ...this.props.state,
            token: response.data.idToken,
            userId: response.data.localId,
            error: null
        }
        console.log(newState)
        axios.post('https://sleep-scheduler-4c01c-default-rtdb.firebaseio.com/data.json?auth=' + response.data.idToken, newState)
        .then( () =>{
            const queryParams = "?auth=" + response.data.idToken + '&orderBy="userId"&equalTo="' + response.data.localId + '"';
            axios.get('https://sleep-scheduler-4c01c-default-rtdb.firebaseio.com/data.json' + queryParams)
            .then(res => {
                axios.patch('https://sleep-scheduler-4c01c-default-rtdb.firebaseio.com/data/' + Object.keys(res.data)[0].toString() + '.json?auth=' + response.data.idToken, {...newState, dataId: Object.keys(res.data)[0].toString()})
                this.props.authSignUp({...newState, dataId: Object.keys(res.data)[0].toString()})
            })
        }
        );

        
    }

    loginHelper = (response) => {
        const queryParams = "?auth=" + response.data.idToken + '&orderBy="userId"&equalTo="' + response.data.localId + '"';
        axios.get('https://sleep-scheduler-4c01c-default-rtdb.firebaseio.com/data.json' + queryParams)
        .then(res => {
            this.props.authLogin(res)
        })
    }

    auth = (event) => {
        event.preventDefault()
        const authData = {
            email: this.state.email,
            password: this.state.password,
            returnSecureToken: true
        }
        let urlString = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCeXzqMKfL2wtLddwTGxR2xjBpXjfRXfc0"
        if(this.state.signingUp){
            urlString = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCeXzqMKfL2wtLddwTGxR2xjBpXjfRXfc0"
        }
        axios.post(urlString, authData)
        .then(response => {
            if(this.state.signingUp){
                this.signupHelper(response);
            }
            else{
                this.loginHelper(response);
            }
            this.props.modalClose();
        })
        .catch(err => {
            this.props.authFail(err);
        })
    }

    render(){
        let button = null
        if(this.state.signingUp){
            button = 
            <Aux>
                <Button 
                    onClick = {(event) => this.auth(event)} 
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
                    onClick = {(event) => this.auth(event)} 
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

        let errorMessage = null;
        if(this.props.error){
            errorMessage = <p>{this.props.error.message}</p>
        }
        return (
            <Aux>
                <div className = {classes.Modal}>
                        {errorMessage}
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

const mapStateToProps = state => {
    return {
        error: state.error,
        state: state
    }
}
const mapDispatchToProps = dispatch => {
    return {
        authFail: (error) => dispatch({type: "AUTH_FAIL", error: error}),
        authSignUp: (response) => dispatch({type: "AUTH_SIGNUP", response: response}),
        authLogin: (response) => dispatch({type: "AUTH_LOGIN", response: response})
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login)