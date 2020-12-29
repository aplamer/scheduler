import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
const Input = () => {
    return(
        <InputGroup size = "lg">
            <FormControl  disabled = {true} placeholder = "12:00" aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
        </InputGroup>
    )
}
export default Input;