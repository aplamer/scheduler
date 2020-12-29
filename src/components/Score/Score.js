import React, {Component} from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import classes from './Score.module.css'
class Score extends Component {
    render(){
        return(
            <Container>
                <Col className = {classes.scoreImg}>73</Col>
            </Container>
        )
    }
    
}
export default Score;
