// ADD EVENTS INDEX
import React from "react";
import { Container } from "react-bootstrap";
import "./Events.css";
import EventsDashboard from "../dashboard/userDashboard/Events/EventsDashboard";
import { Fragment } from "react";

export default function EventsIndex() {
  return (
    <Fragment>
      <div className="googleCalendar">
        <iframe
          src="https://calendar.google.com/calendar/embed?height=700&wkst=1&bgcolor=%23616161&ctz=America%2FVancouver&src=ZzhsNzVpbjltcHFma28yYjZzOTF1ZDkyMTBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23F6BF26&title=Event%20Schedule"
          frameborder="0"
          scrolling="no"
        ></iframe>
      </div>
      <Container>
        <EventsDashboard />
      </Container>
    </Fragment>
  );
}
