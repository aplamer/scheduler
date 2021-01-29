import React from 'react'
import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import {connect} from 'react-redux'
import { Component } from 'react';
class PrevInputs extends Component {
    render(){
        return(
            <Container>
                <h2>Yesterday's Times</h2>
                <br></br>
                <Row>
                    <Col>
                        Sleep Time
                        <InputGroup size = "lg">
                            <FormControl  disabled = {true} placeholder = {this.props.prevTimes[1].sleepTime} aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
                        </InputGroup>
                        
                    </Col>
    
                    <Col>
                        Wakeup Time
                        <InputGroup size = "lg">
                            <FormControl  disabled = {true} placeholder = {this.props.prevTimes[1].wakeTime} aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
                        </InputGroup>
                    </Col>
                </Row>
            </Container>
        )
    }
    
}
const mapStateToProps = state => {
    return {
        prevTimes: state.Times
    };
}
export default connect(mapStateToProps)(PrevInputs);