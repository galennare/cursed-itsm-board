import React, { useState } from "react";
import { screen, render } from "@testing-library/react";
import { TicketItem } from "./TicketItem";
import { Ticket } from "./TicketItem";
import { Hook } from "../TicketDatabase";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

beforeEach(() => {
    const newTicket: Ticket = {
        id: 1,
        title: "Computer Issues",
        description: "This is the description for ticket one.",
        priority: 0,
        last_modified: new Date(),
        author: "Joe Biden",
        status: "In-Progress",
        assignee: "Nick DiGirolamo",
        image_path: "path_to_image"
    };

    function TicketItemHookWrapper(): JSX.Element {
        const ticketHook: Hook<Ticket> = useState<Ticket>(newTicket);

        return (
            <DndProvider backend={HTML5Backend}>
                <TicketItem ticket_hook={ticketHook} />
            </DndProvider>
        );
    }

    render(<TicketItemHookWrapper />);
});

test("There is a TicketItem", () => {
    const ticketAuthor = screen.getByText(/Author/i);
    const ticketPriority = screen.getByText(/Priority/i);
    const ticketStatus = screen.getByText(/Status/i);

    expect(ticketAuthor).toBeInTheDocument();
    expect(ticketPriority).toBeInTheDocument();
    expect(ticketStatus).toBeInTheDocument();
});
