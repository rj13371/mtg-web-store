// ADD EVENTS INDEX
import React from 'react'
import { Container } from 'react-bootstrap'

export default function EventsIndex() {
    return (
        <Container className="d-flex justify-content-center">
            <iframe src="https://calendar.google.com/calendar/embed?height=700&wkst=1&bgcolor=%23616161&ctz=America%2FVancouver&src=ZzhsNzVpbjltcHFma28yYjZzOTF1ZDkyMTBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23F6BF26&title=Event%20Schedule"  width="900" height="700" frameborder="0" scrolling="no"></iframe>
        </Container>
    )
}
