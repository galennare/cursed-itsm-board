import { render, screen } from "@testing-library/react";
import { TicketList } from "./TicketList";
import React, { useState } from "react";
import { UserRole } from "./NavigationBar";
import { Hook } from "../TicketDatabase";
import { Ticket } from "./TicketItem";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

test("TicketList is rendering.", () => {
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

    function TicketListHookWrapper(): JSX.Element {
        const ticketHook: Hook<Ticket> = useState<Ticket>(newTicket);

        return (
            <DndProvider backend={HTML5Backend}>
                <TicketList
                    ticket_hooks={[ticketHook]}
                    list_type={UserRole.User}
                ></TicketList>
            </DndProvider>
        );
    }

    render(<TicketListHookWrapper />);
    const ticketList = screen.getByRole("ticket_list");
    expect(ticketList).toBeInTheDocument();
});
