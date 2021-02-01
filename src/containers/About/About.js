import React from 'react'
import Container from 'react-bootstrap/Container'
const About = () => {
    return(
        <Container>
            <div>
                <p>
                Hi, if you're reading this right now that must mean you're on the Sleep Scheduler website!
                The Sleep Schduler website is a (currently in progress) website which will allow you to record
                sleep and wake up times, check up on your sleep history for the past week, see your total sleep hours and more!
                Sleep Scheduler will also give you a score based on how consistent your sleep schedule has been and will rate
                certain aspect of your sleep habits such as consistency in time and total sleep hours.
                </p>

                <p>
                Use the sleep schedule website whenever you wake up to record an approxiamation of when you slept and woke up.
                Make sure to record your sleep and wake times as accurately as possible to help better adjust it and make it 
                more consistent, this website is only really useful if you're honest with your sleeping habits.
                </p>
               

            </div>
        </Container>
    )
}

export default About