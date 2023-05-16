import React, { useState } from "react";
import { screen, render } from "@testing-library/react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Ticket } from "../Interface/TicketInterface";
import { TicketItemEditable } from "./TicketItemEditable";

test("There is a TicketItem", () => {
    const ticketAuthor = screen.getByText(/Author/i);
    expect(ticketAuthor).toBeInTheDocument();
});

beforeEach(() => {
    function ticketSetter(ticket: Ticket): void {
        console.log(`'${ticket.title}' was set.`);
    }

    const newTicket: Ticket = {
        id: "1",
        title: "Computer Issues",
        description: "This is the description for ticket one.",
        priority: 0,
        last_modified: new Date(),
        author: "Joe Biden",
        status: "Pending",
        assignee: "Nick DiGirolamo",
        image_path: "path_to_image"
    };

    function TicketItemHookWrapper(): JSX.Element {
        return (
            <DndProvider backend={HTML5Backend}>
                <TicketItemEditable
                    ticket={newTicket}
                    ticketSetter={ticketSetter}
                />
            </DndProvider>
        );
    }

    render(<TicketItemHookWrapper />);
});

test("There is a TicketItem", () => {
    const ticketTitle = screen.getByText(/Title/i);
    const ticketAuthor = screen.getByText(/Author/i);
    const ticketAssignee = screen.getByText(/Assignee/i);
    const ticketDescription = screen.getByText(/Description/i);

    expect(ticketAuthor).toBeInTheDocument();
    expect(ticketTitle).toBeInTheDocument();
    expect(ticketAssignee).toBeInTheDocument();
    expect(ticketDescription).toBeInTheDocument();
});
