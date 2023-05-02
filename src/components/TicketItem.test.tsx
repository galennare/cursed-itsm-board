import React from "react";
import { screen, render } from "@testing-library/react";
import { TicketItem } from "./TicketItem";
import { Ticket } from "../Interfaces/TicketInterface";

beforeEach(() => {
    const newTicket: Ticket = {
        id: 1,
        title: "Computer Issues",
        description: "This is the description for ticket one.",
        priority: 0,
        last_modified: new Date(),
        author: "Joe Biden",
        status: "Pending",
        assignee: "Nick DiGirolamo",
        image_path: "path_to_image"
    };

    render(<TicketItem ticketData={newTicket} />);
});

test("There is a TicketItem", () => {
    const ticketAuthor = screen.getByText(/Author/i);
    expect(ticketAuthor).toBeInTheDocument();
});
