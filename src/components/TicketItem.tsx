import React from "react";
import { Ticket } from "../Interfaces/TicketInterface";

/*
    KEY PART OF MVP #########################################################

    This is the JSX UI component of a ticket that will be rendered in lists.
    For the MVP this component takes 1 parameter of a Ticket instance and
    renders the relevant contnent such as title, description, author, etc.
    in a visually pleasing manor.

    This component does NOT feature a button/toggle to show/hide the data it
    contains.

    #########################################################################

    In later revisions of this component we will change any text fields such
    as the title and description to be text inputs so that a user such as
    the admin or super can edit a ticket if they would like. As such, we will
    eventually need to make this component accept more parameters such as
    an update hook/function that actually changes the ticket data in the
    object when the user makes a change.

    Additionally we may need to pass parameters indicating what list this
    component is being rendered within (central/admin/user) and who the
    current user is in order to determine whether the text fields should be
    editable.
 */
export function TicketItem({
    ticketData
}: {
    ticketData: Ticket;
}): JSX.Element {
    return (
        <div
            key={ticketData.id}
            style={{
                border: "5px solid black",
                margin: "10px"
            }}
        >
            <h1>{ticketData.title}</h1>
            <h4>Author: {ticketData.author}</h4>
            <h4> Assigned To: {ticketData.assignee}</h4>
            <div>
                Status: {ticketData.status} Priority: {ticketData.priority}
            </div>
            <p>{ticketData.description}</p>
        </div>
    );
}
