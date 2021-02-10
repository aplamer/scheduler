import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import classes from './Header.module.css'
import icon from '../../assets/logo.png'
import Login from '../Login/Login'
import { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
class Header extends Component {
    state = {
        loggingIn: false
    }

       
    loginToggler = () => {
        this.setState({loggingIn: false})
    }
    
    logoutHelper = () => {
        this.props.logOut();
        this.props.history.push('/')
        
    }
    render(){

        let modal = this.state.loggingIn ? <Login show = {this.state.loggingIn} modalClose = {this.loginToggler}/> : null
        let authButton = null
        if(this.props.token){
            authButton = <Button variant="outline-primary" className = {classes.signIn} onClick = {this.logoutHelper}>Log out</Button>
        }
        else{
            authButton = <Button variant="outline-primary" className = {classes.signIn} onClick = {() => this.setState({loggingIn: true})}>Log In</Button>
        }
        return(
            <div>
                <Navbar className = {classes.Header} variant="light">
                    <img src = {icon} alt = "Null" className = {classes.navImage}></img>
                    <Nav variant = "pills" className="mr-auto">
                        <Link to="/" className = {classes.navLink}>Home</Link>
                        <Link to="/history" className = {classes.navLink}>History</Link>
                        <Link to="/about" className = {classes.navLink}>About</Link>
                        <Link to="/settings" className = {classes.navLink}>Settings</Link>
                    </Nav>
                    <Form inline>
                    {authButton}
                    </Form>
                </Navbar>
                {modal}
            </div>
            
        )
    }
}
const mapStateToProps = state => {
    return {
        token: state.token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        logOut: () => dispatch({type: "LOGOUT"})
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header)