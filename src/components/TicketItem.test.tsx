import React, { useState } from "react";
import { screen, render } from "@testing-library/react";
import { TicketItem } from "./TicketItem";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Ticket } from "../Interface/TicketInterface";
import { v4 } from "uuid";
import { ChildProps } from "./TicketItem";

test("There is a TicketItem", () => {
    const ticketAuthor = screen.getByText(/Author/i);
    expect(ticketAuthor).toBeInTheDocument();
});

beforeEach(() => {
    const newTicket: Ticket = {
        id: v4(),
        title: "Computer Issues",
        description: "This is the description for ticket one.",
        priority: 0,
        last_modified: new Date(),
        author: "Joe Biden",
        status: "Pending",
        assignee: "Nick DiGirolamo",
        image_path: "path_to_image"
    };

    function TicketItemHookWrapper({ ticket }: ChildProps): JSX.Element {
        return (
            <DndProvider backend={HTML5Backend}>
                <TicketItem
                    ticket={ticket}
                    onDelete={function (): void {
                        throw new Error("Function not implemented.");
                    }}
                    ticketItem={newTicket}
                />
            </DndProvider>
        );
    }

    render(
        <TicketItemHookWrapper
            onDelete={function (): void {
                throw new Error("Function not implemented.");
            }}
            ticket={{
                ticket: newTicket
            }}
            ticketItem={newTicket}
        />
    );
});

test("There is a TicketItem", () => {
    const ticketAuthor = screen.getByText(/Author/i);
    const ticketPriority = screen.getByText(/Priority/i);
    const ticketStatus = screen.getByText(/Status/i);

    expect(ticketAuthor).toBeInTheDocument();
    expect(ticketPriority).toBeInTheDocument();
    expect(ticketStatus).toBeInTheDocument();
});
