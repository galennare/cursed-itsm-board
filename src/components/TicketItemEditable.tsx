import React from "react";
import { useDrag } from "react-dnd";
import { Ticket } from "../Interface/TicketInterface";
import { StateSetter } from "../Interface/Hook";

/*
    This is a UI component that will be rendered for each ticket
    in the AdminList. When tickets are in the admin list the
    admin and super need to have the ability to edit the content
    in each ticket such as the title and description. This component
    is just like the TicketItem but it also has state for updating
    content of ticket items.
*/

export function TicketItemEditable({
    ticket,
    ticketSetter
}: {
    ticket: Ticket;
    ticketSetter: (ticket: Ticket) => void;
}): JSX.Element {
    const [, drag] = useDrag(() => ({
        type: "TicketItem",
        item: { ticket: ticket }
    }));

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
            <h1>{ticket.title}</h1>
            <h4>Author: {ticket.author}</h4>
            <h4>Assigned To: {ticket.assignee}</h4>
            <div>
                Status: {ticket.status} Priority: {ticket.priority}
            </div>
            <p>{ticket.description}</p>
        </div>
    );
}
