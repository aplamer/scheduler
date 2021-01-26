import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import classes from './Header.module.css'
import icon from '../../assets/placeholder.png'
import Modal from '../UI/Modal/Modal'
import { Component } from 'react'
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
                    <Nav.Link href="#" className = {classes.navLink}>Home</Nav.Link>
                    <Nav.Link href="#" className = {classes.navLink}>History</Nav.Link>
                    <Nav.Link href="#" className = {classes.navLink}>About</Nav.Link>
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