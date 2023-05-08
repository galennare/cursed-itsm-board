import { render, screen } from "@testing-library/react";
import { TicketList } from "./TicketList";
import React, { useState } from "react";
import { UserRole } from "./NavigationBar";
import { Hook } from "../TicketDatabase";
import { Ticket } from "../Interface/TicketInterface";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AdminList } from "./AdminList";

test("TicketList is rendering.", () => {
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

    const [, centralDrop] = useDrop(() => ({
        accept: "TicketItem"
    }));

    function TicketListHookWrapper(): JSX.Element {
        const [list, setList] = useState<Ticket[]>([]);
        return (
            <DndProvider backend={HTML5Backend}>
                <TicketList list={list} setList={setList}></TicketList>
            </DndProvider>
        );
    }

    render(<TicketListHookWrapper />);
    const ticketList = screen.getByRole("ticket_list");
    expect(ticketList).toBeInTheDocument();
});
