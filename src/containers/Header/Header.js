import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import classes from './Header.module.css'
import icon from '../../assets/placeholder.png'
import Modal from '../../components/UI/Modal/Modal'
import { Component } from 'react'
import {Link} from 'react-router-dom'
class Header extends Component {
    state = {
        loggingIn: false
    }

       
    loginToggler = () => {
        this.setState({loggingIn: false})
    }
    
    render(){

        let modal = this.state.loggingIn ? <Modal show = {this.state.loggingIn} modalClose = {this.loginToggler}/> : null

        return(
            <div>
                <Navbar bg="light" variant="light" className = "py-3">
                    <img src = {icon} alt = "Null" className = {classes.navImage}></img>
                    <Nav variant = "pills" className="mr-auto">
                        <Link to="/" className = {classes.navLink}>Home</Link>
                        <Link to="/history" className = {classes.navLink}>History</Link>
                        <Link to="/about" className = {classes.navLink}>About</Link>
                    </Nav>
                    <Form inline>
                    <Button variant="outline-primary" className = {classes.signIn} onClick = {() => this.setState({loggingIn: true})}>Login</Button>
                    </Form>
                </Navbar>
                {modal}
            </div>
            
        )
    }
}

export default Header