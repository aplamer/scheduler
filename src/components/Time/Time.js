import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
const Time = (props) => {
    return(
        <div>
            <Container>
                <Row>
                    <Col> 
                        {props.day}
                    </Col>
                    <Col>
                        {props.date}
                    </Col>
                    <Col> 
                        {props.time}
                    </Col>
                </Row>
            </Container>
            
        </div>
    )
}

export default Time;