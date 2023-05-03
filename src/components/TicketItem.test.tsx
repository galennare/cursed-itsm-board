import React, { useState } from "react";
import { screen, render } from "@testing-library/react";
import { TicketList } from "./TicketList";
import { Ticket, TicketItem } from "./TicketItem";
import { Hook } from "../TicketDatabase";

test("TicketList is rendering.", () => {
    render(<TicketList ticket_hooks={[]}></TicketList>);
    const ticketList = screen.getByRole("ticket_list");
    expect(ticketList).toBeInTheDocument();
});

test("TicketItem is rendering.", () => {
    const ticket: Ticket = {
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

    function HookWrapper(): JSX.Element {
        const hookedTicket: Hook<Ticket> = useState<Ticket>(ticket);
        return <TicketItem ticket_hook={hookedTicket}></TicketItem>
    }

    render(<HookWrapper />);
    const ticketItem = screen.getByRole("ticket_item");
    expect(ticketItem).toBeInTheDocument();
});
