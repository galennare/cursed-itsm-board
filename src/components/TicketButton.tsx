import React from "react";
import { Button } from "react-bootstrap";

export function TicketButton(): JSX.Element {
    return (
        <span>
            <Button style={{ textAlign: "right" }}>View All My Tickets</Button>
        </span>
    );
}
