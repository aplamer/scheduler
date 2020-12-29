import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
const Input = () => {
    return(
        <InputGroup size = "lg">
            <InputGroup.Prepend>
                <Button size = "lg" variant = "success">Save</Button>
            </InputGroup.Prepend>
            <FormControl  placeholder = "12:00" aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
        </InputGroup>
    )
}
export default Input;