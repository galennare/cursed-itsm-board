import React from "react";
import { useDrag } from "react-dnd";
import { Ticket, TicketStatus } from "../Interface/TicketInterface";
import { Button, Form } from "react-bootstrap";

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
    ticketSetter,
    deleteTicket
}: {
    ticket: Ticket;
    ticketSetter: (ticket: Ticket) => void;
    deleteTicket: (ticket: Ticket) => void;
}): JSX.Element {
    function deleteCurrentTicket(): void {
        deleteTicket(ticket);
    }

    /* Setter functions for each property */
    function setTicketTitle(e: React.ChangeEvent<HTMLInputElement>): void {
        ticketSetter({ ...ticket, title: e.target.value });
    }

    function setTicketAuthor(e: React.ChangeEvent<HTMLInputElement>): void {
        ticketSetter({ ...ticket, author: e.target.value });
    }

    function setTicketAssignee(e: React.ChangeEvent<HTMLInputElement>): void {
        ticketSetter({ ...ticket, assignee: e.target.value });
    }

    function setTicketDescription(
        e: React.ChangeEvent<HTMLInputElement>
    ): void {
        ticketSetter({ ...ticket, description: e.target.value });
    }

    function setTicketStatus(e: React.ChangeEvent<HTMLSelectElement>): void {
        ticketSetter({ ...ticket, status: e.target.value as TicketStatus });
    }

    function setTicketPriority(e: React.ChangeEvent<HTMLSelectElement>): void {
        ticketSetter({
            ...ticket,
            priority: e.target.value as unknown as 0 | 1 | 2 | 3 | 4 | 5
        });
    }

    const [, drag] = useDrag(() => ({
        type: "TicketItem",
        item: ticket
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
            <Form.Group controlId="ticketStatus">
                <Form.Label>Status: </Form.Label>
                <Form.Select value={ticket.status} onChange={setTicketStatus}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                </Form.Select>
            </Form.Group>
            <Form.Group controlId="ticketPriority">
                <Form.Label>Priority: </Form.Label>
                <Form.Select
                    value={ticket.priority}
                    onChange={setTicketPriority}
                >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </Form.Select>
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
        </div>
    );
}
