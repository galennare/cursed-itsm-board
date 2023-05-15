import { render, screen } from "@testing-library/react";
import { AdminList, canDrop } from "./AdminList";
import React, { useState } from "react";
import { Ticket } from "../Interface/TicketInterface";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { UserRole } from "./NavigationBar";

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

    function TicketListHookWrapper(): JSX.Element {
        const [list, setList] = useState<Ticket[]>([]);
        return (
            <DndProvider backend={HTML5Backend}>
                <AdminList
                    title={"test"}
                    userRole={UserRole.Super}
                    requiredRole={UserRole.Super}
                    userList={list}
                    adminList={list}
                    centralList={list}
                    setUserList={setList}
                    setAdminList={setList}
                    setCentralList={setList}
                ></AdminList>
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
    expect(!canDrop(userRole, requiredRole)).toBeTruthy();
});

test("Has editable tickets", () => {
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

    function TicketListHookWrapper(): JSX.Element {
        const [list, setList] = useState<Ticket[]>([newTicket]);
        return (
            <DndProvider backend={HTML5Backend}>
                <AdminList
                    title={"test"}
                    userRole={UserRole.Super}
                    requiredRole={UserRole.Super}
                    userList={list}
                    adminList={list}
                    centralList={list}
                    setUserList={setList}
                    setAdminList={setList}
                    setCentralList={setList}
                ></AdminList>
            </DndProvider>
        );
    }

    render(<TicketListHookWrapper />);
    const ticketTitle = screen.getByText(/Title/i);
    const ticketAuthor = screen.getByText(/Author/i);
    const ticketAssignee = screen.getByText(/Assignee/i);
    const ticketDescription = screen.getByText(/Description/i);

    expect(ticketAuthor).toBeInTheDocument();
    expect(ticketTitle).toBeInTheDocument();
    expect(ticketAssignee).toBeInTheDocument();
    expect(ticketDescription).toBeInTheDocument();
});
