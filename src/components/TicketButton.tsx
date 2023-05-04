import React from "react";
import { Button } from "react-bootstrap";

/*
    This file/component should be removed/deleted and implemented directly
    within the lists themselves.
    
    By putting a button component directly in the list component makes
    it 100x for the button to call the hide/show function in the list
    component.
*/

export function TicketButton(): JSX.Element {
    return (
        <span>
            <Button style={{ textAlign: "right" }}>View All My Tickets</Button>
        </span>
    );
}
