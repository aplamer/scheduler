import React from 'react'
import { Container } from 'react-bootstrap';
import Input from './Input/Input'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
const Inputs = () => {
    return(
        <Container>
            <h2>Today's Times</h2>
            <br></br>
            <Row>
                <Col>
                    Wakeup Time
                    <Input>

                    </Input>
                </Col>

                <Col>
                    Sleep Time
                    <Input>

                    </Input>
                </Col>
            </Row>
            <br></br>
            <hr></hr>
        </Container>
       
    )
}

export default Inputs;