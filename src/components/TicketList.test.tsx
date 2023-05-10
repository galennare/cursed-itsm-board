import { render, screen } from "@testing-library/react";
import { TicketList, allowedToDrop } from "./TicketList";
import React, { useState } from "react";
import { Ticket } from "../Interface/TicketInterface";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { UserRole } from "./NavigationBar";
import crypto from "crypto";

test("TicketList is rendering.", () => {
    const newTicket: Ticket = {
        id: crypto.randomUUID(),
        title: "Computer Issues",
        description: "This is the description for ticket one.",
        priority: 0,
        last_modified: new Date(),
        author: "Joe Biden",
        status: "Pending",
        assignee: "Nick DiGirolamo",
        image_path: "path_to_image"
    };

    function TicketListHookWrapper(): JSX.Element {
        const [list, setList] = useState<Ticket[]>([]);
        return (
            <DndProvider backend={HTML5Backend}>
                <TicketList
                    title={"test"}
                    userRole={UserRole.Super}
                    requiredRole={UserRole.Super}
                    list={list}
                    setList={setList}
                ></TicketList>
            </DndProvider>
        );
    }

    render(<TicketListHookWrapper />);
    const ticketList = screen.getByRole("ticket_list");
    expect(ticketList).toBeInTheDocument();
});

test("canDrop is working properly.", () => {
    const userRole = UserRole.User;
    const requiredRole = UserRole.Super;
    expect(allowedToDrop(userRole, requiredRole)).toBeFalsy();
});
