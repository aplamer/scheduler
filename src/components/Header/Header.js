import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import classes from './Header.module.css'
import icon from '../../assets/placeholder.png'
const Header = () => {
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
                <Button variant="outline-primary" className = {classes.signIn}>Login</Button>
                </Form>
            </Navbar>
        </div>
        
    )
}

export default Header