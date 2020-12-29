import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import classes from './Tips.module.css'

const Tips = () =>{
    return(
        <Container>
            <Col className = {classes.tipsText}>
                Hey did you know.
            </Col>
        </Container>
    )
}
export default Tips