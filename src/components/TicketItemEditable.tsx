import React from "react";
import { useDrag } from "react-dnd";
import { Ticket } from "../Interface/TicketInterface";
import { StateSetter } from "../Interface/Hook";
import { Form } from "react-bootstrap";

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
    /* Setter functions for each property */
    function setTicketTitle(e: React.ChangeEvent<HTMLInputElement>): void {
        const title = e.target.value;
        if (title != "") {
            const newTicket = { ...ticket };
            newTicket.title = title;
            ticketSetter(newTicket);
        }
    }

    function setTicketAuthor(e: React.ChangeEvent<HTMLInputElement>): void {
        const author = e.target.value;
        if (author != "") {
            const newTicket = { ...ticket };
            newTicket.author = author;
            ticketSetter(newTicket);
        }
    }

    function setTicketAssignee(e: React.ChangeEvent<HTMLInputElement>): void {
        const assignee = e.target.value;
        if (assignee != "") {
            const newTicket = { ...ticket };
            newTicket.assignee = assignee;
            ticketSetter(newTicket);
        }
    }

    function setTicketDescription(
        e: React.ChangeEvent<HTMLInputElement>
    ): void {
        const description = e.target.value;
        if (description != "") {
            const newTicket = { ...ticket };
            newTicket.description = description;
            ticketSetter(newTicket);
        }
    }

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
            <Form.Group controlId="ticketTitle">
                <Form.Label>Title: </Form.Label>
                <Form.Control
                    value={ticket.title}
                    onChange={setTicketTitle}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId="ticketAuthor">
                <Form.Label>Author: </Form.Label>
                <Form.Control
                    value={ticket.author}
                    onChange={setTicketAuthor}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId="ticketAssignee">
                <Form.Label>Assignee: </Form.Label>
                <Form.Control
                    value={ticket.assignee}
                    onChange={setTicketAssignee}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId="ticketDescripiton">
                <Form.Label>Description: </Form.Label>
                <Form.Control
                    value={ticket.description}
                    onChange={setTicketDescription}
                ></Form.Control>
            </Form.Group>
            {/**<h1>{ticket.title}</h1>
            <h4>Author: {ticket.author}</h4>
            <h4>Assigned To: {ticket.assignee}</h4>
            <div>
                Status: {ticket.status} Priority: {ticket.priority}
            </div>
            <p>{ticket.description}</p>**/}
        </div>
    );
}
