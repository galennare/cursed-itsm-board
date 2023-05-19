import React from "react";
import { act, render, screen } from "@testing-library/react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Ticket } from "../Interface/TicketInterface";
import { TicketItemEditable } from "./TicketItemEditable";

function mockDeleteTicket(ticket: Ticket): void {
    console.log(ticket.id);
    return;
}

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

beforeEach(() => {
    function TicketItemHookWrapper(): JSX.Element {
        return (
            <DndProvider backend={HTML5Backend}>
                <TicketItemEditable
                    ticket={newTicket}
                    ticketSetter={ticketSetter}
                    deleteTicket={mockDeleteTicket}
                />
            </DndProvider>
        );
    }

    render(<TicketItemHookWrapper />);
});

test("There is a TicketItem", () => {
    const ticketAuthor = screen.getByText(/Author/i);
    expect(ticketAuthor).toBeInTheDocument();
});

test("There is a TicketItem", () => {
    const ticketTitle = screen.getByText(/Title/i);
    const ticketAuthor = screen.getByText(/Author/i);
    const ticketAssignee = screen.getByText(/Assignee/i);
    const ticketDescription = screen.getByText(/Description/i);
    const ticketStatus = screen.getByText(/Status/i);
    const ticketPriority = screen.getByText(/Priority/i);

    expect(ticketAuthor).toBeInTheDocument();
    expect(ticketTitle).toBeInTheDocument();
    expect(ticketAssignee).toBeInTheDocument();
    expect(ticketDescription).toBeInTheDocument();
    expect(ticketStatus).toBeInTheDocument();
    expect(ticketPriority).toBeInTheDocument();
});

test("Clicking the button deletes the ticket", () => {
    const deleteButton = screen.getByText(/Delete/i);

    act(() => {
        deleteButton.click();
    });

    const ticketText = screen.queryByText(/Computer Issues/i);
    expect(ticketText).toBeNull();
});
