import React, {Component} from 'react'
import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import {Button} from 'react-bootstrap'
import classes from './Inputs.module.css'
import {connect} from 'react-redux'

import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
class Inputs extends Component {
    state = {
        sleepTime: "N/A",
        wakeTime: "N/A"
    }

    render(){
        return(
            <Container>
                <h2>Today's Times</h2>
                <br></br>
                <Row>
                    <Col>
                        Wakeup Time
                        <InputGroup size = "lg">
                            <FormControl onChange = {event => this.setState({wakeTime: event.target.value})} placeholder = "12:00PM" aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
                        </InputGroup>
                    </Col>
    
                    <Col>
                        Sleep Time
                        <InputGroup size = "lg">
                            <FormControl onChange = {event => this.setState({sleepTime: event.target.value})} placeholder = "12:00PM" aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
                        </InputGroup>
                    </Col>
                </Row>
                <br></br>
                
                <Button  onClick = {() => this.props.onAddTime(this.state)} className = {classes.Button}size = "lg" variant = "success">Save Times</Button>
                <hr></hr>
    
            </Container>
           
        )
    }
    
}

const mapStateToProps = state => {
    return {
        times: state.Times,
        score: state.sleepScore
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddTime: (savedTime) => dispatch({type: "ADD", id: new Date().toString(), value: savedTime}),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Inputs);