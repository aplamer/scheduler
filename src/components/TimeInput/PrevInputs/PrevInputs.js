import React from 'react'
import PrevInput from './PrevInput/PrevInput'
import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
const PrevInputs = () => {
    return(
        <Container>
            <h2>Yesterday's Times</h2>
            <br></br>
            <Row>
                <Col>
                    Wakeup Time
                    <PrevInput>

                    </PrevInput>
                </Col>

                <Col>
                    Sleep Time
                    <PrevInput>

                    </PrevInput>
                </Col>
            </Row>
        </Container>
    )
}

export default PrevInputs;