import React, { useState } from "react";
import userEvent from "@testing-library/user-event";
import { act, render, screen } from "@testing-library/react";
import { Ticket } from "./TicketItem";
import { EditTicket } from "./Edit_Mode_Ticket";
import { UserRole } from "./NavigationBar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

test("There is EditMode", () => {
    const editMode = screen.getByText(/Edit Mode/i);
    expect(editMode).toBeInTheDocument();
});

beforeEach(() => {
    const myTicket: Ticket = {
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

    function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    function randomUserRole(): UserRole {
        if (getRandomInt(3) === 0) {
            return UserRole.Super;
        } else if (getRandomInt(3) === 1) {
            return UserRole.Admin;
        } else {
            return UserRole.User;
        }
    }

    function EditModeHookWrapper(): JSX.Element {
        return (
            <DndProvider backend={HTML5Backend}>
                <EditTicket
                    ticket={myTicket}
                    currentUserRole={randomUserRole()}
                    editListOwner={randomUserRole()}
                ></EditTicket>
            </DndProvider>
        );
    }

    render(<EditModeHookWrapper />);
    /*act(() => {
        render(<EditModeHookWrapper />);
    });*/
});

test("There is EditMode", () => {
    const ticketTitle = screen.getByText(/Title/i);
    const ticketDescription = screen.getByText(/Description/i);
    const ticketPriority = screen.getByText(/Priority/i);
    const ticketImage = screen.getByText(/Image/i);
    const ticketStatus = screen.getByText(/Status/i);
    const ticketLastModified = screen.getByText(/Lastly edited on/i);
    const ticketAssignee = screen.getByText(/Assignee/i);

    expect(ticketTitle).toBeInTheDocument();
    expect(ticketDescription).toBeInTheDocument();
    expect(ticketPriority).toBeInTheDocument();
    expect(ticketImage).toBeInTheDocument();
    expect(ticketStatus).toBeInTheDocument();
    expect(ticketLastModified).toBeInTheDocument();
    expect(ticketAssignee).toBeInTheDocument();
});

test("Can switch into Edit Mode", () => {
    const switchButton = screen.getByRole("checkbox");
    act(() => {
        switchButton.click();
    });
    expect(screen.getAllByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toHaveLength(2);
});

test("Editing the title changes the title text", () => {
    const myTicket: Ticket = {
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

    const nameBox = screen.getByText(myTicket.title);
    act(() => {
        userEvent.type(nameBox, "Computer problems");
    });
    expect(screen.getByText(/Computer problems/i)).toBeInTheDocument();
});

test("Editing the description changes the description text", () => {
    const myTicket: Ticket = {
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

    const descriptionBox = screen.getByText(myTicket.description);
    act(() => {
        userEvent.type(descriptionBox, "This is the description of the ticket");
    });
    expect(
        screen.getByText(/This is the description of the ticket/i)
    ).toBeInTheDocument();
});

test("Editing the priority changes the priority text", () => {
    const myTicket: Ticket = {
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

    const prioBox = screen.getByText(myTicket.priority);
    act(() => {
        userEvent.type(prioBox, "5");
    });
    expect(screen.getByText(/5/i)).toBeInTheDocument();
});

test("Editing the image changes the image text", () => {
    const myTicket: Ticket = {
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

    const imageBox = screen.getByText(myTicket.image_path);
    act(() => {
        userEvent.type(imageBox, "image.png");
    });
    expect(screen.getByText(/image.png/i)).toBeInTheDocument();
});

test("Editing the status changes the dropdown option", () => {
    const myTicket: Ticket = {
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

    const statusBox = screen.getByText(myTicket.status);
    act(() => {
        userEvent.type(statusBox, "Pending");
    });
    expect(screen.getByText(/Pending/i)).toBeInTheDocument();
});

test("Editing the assignee changes the assignee text", () => {
    const myTicket: Ticket = {
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

    const assignBox = screen.getByText(myTicket.assignee);
    act(() => {
        userEvent.type(assignBox, "Victor Leclercq");
    });
    expect(screen.getByText(/Victor Leclercq/i)).toBeInTheDocument();
});
