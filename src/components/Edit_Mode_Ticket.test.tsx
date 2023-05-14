import React, { useState } from "react";
import userEvent from "@testing-library/user-event";
import { act, render, screen } from "@testing-library/react";
import { Ticket } from "./TicketItem";
import { EditTicket } from "./Edit_Mode_Ticket";
import { UserRole } from "./NavigationBar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { check } from "prettier";
import exp from "constants";

test("There is EditMode (1)", () => {
    const ticketTitle = screen.getByText(/Title/i);
    expect(ticketTitle).toBeInTheDocument();
});

beforeEach(() => {
    const myTicket: Ticket = {
        id: 1,
        title: "Computer Issues",
        description: "This is ticket one.",
        priority: 0,
        last_modified: new Date(),
        author: "Joe Biden",
        status: "In-Progress",
        assignee: "Nick DiGirolamo",
        image_path: "path_to_picture"
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
});

test("There is EditMode (2)", () => {
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

test("Can check EditMode", () => {
    const editBox = screen.getByRole("checkbox");
    act(() => {
        editBox.click();
    });
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
});

/*test("Editing the title changes the title text", () => {
    const myTicket: Ticket = {
        id: 1,
        title: "Computer Issues",
        description: "This is ticket one.",
        priority: 0,
        last_modified: new Date(),
        author: "Joe Biden",
        status: "In-Progress",
        assignee: "Nick DiGirolamo",
        image_path: "path_to_picture"
    };

    const nameBox = screen.getByText(myTicket.title);
    act(() => {
        userEvent.type(nameBox, "Computer problems");
    });
    expect(nameBox).toEqual(screen.getByText("Computer problems"));
});*/

/*test("Editing the description changes the description text", () => {
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
});*/
