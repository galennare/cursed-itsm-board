import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { Ticket } from "../Interface/TicketInterface";
import { Button } from "react-bootstrap";

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
    ticket,
    deleteTicket
}: {
    ticket: Ticket;
    deleteTicket: (ticket: Ticket) => void;
}): JSX.Element {
    function deleteCurrentTicket(): void {
        deleteTicket(ticket);
    }

    const [, drag] = useDrag(() => ({
        type: "TicketItem",
        item: ticket
    }));
    let visible = false;
    if (ticket.priority === 0) {
        visible = true;
    }
    const [shouldShowImage, setShouldShowImage] = useState(true);

    return (
        <div
            role="ticket_item"
            key={ticket.id}
            ref={drag}
            style={{
                border: "5px solid black",
                margin: "10px",
                flex: "0 0 auto"
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: "10px",
                    paddingBottom: "0px"
                }}
            >
                <Button onClick={deleteCurrentTicket}>Delete</Button>
            </div>
            <h1>{ticket.title}</h1>
            <h4>Author: {ticket.author}</h4>
            <h4>Assigned To: {ticket.assignee}</h4>
            <div>
                Status: {ticket.status} Priority: {ticket.priority}
            </div>
            <p>{ticket.description}</p>
            <div>
                {ticket.status === "Pending" ? (
                    <img
                        id="frogEggs"
                        src={require("../frogEggs.png")}
                        alt="frog Eggs"
                        height="60"
                    />
                ) : null}
            </div>
            <div>
                {ticket.status === "In-Progress" ? (
                    <img
                        id="tadpole"
                        src={require("../bestTadpole.png")}
                        height="40"
                    />
                ) : null}
            </div>
            <div>
                {ticket.status === "Resolved" ? (
                    <img
                        id="finalFrog"
                        src={require("../froggy.png")}
                        alt="cute frog"
                        height="80"
                    />
                ) : null}
            </div>
        </div>
    );
}
