import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Ticket } from "./TicketItem";
import { EditTicket } from "./Edit_Mode_Ticket";
import { Hook } from "../TicketDatabase";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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

    function EditModeHookWrapper(): JSX.Element {
        const ticketHook: Hook<Ticket> = useState<Ticket>(myTicket);

        return (
            <DndProvider backend={HTML5Backend}>
                <EditTicket ticket={ticketHook}></EditTicket>
            </DndProvider>
        );
    }

    render(<EditModeHookWrapper />);
});
test("Initial texts should be ticket fields", () => {
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

    expect(screen.getByText(myTicket.title)).toBeInTheDocument();
    expect(screen.getByText(myTicket.description)).toBeInTheDocument();
    expect(screen.getByText(myTicket.priority)).toBeInTheDocument();
    expect(screen.getByText(myTicket.title)).toBeInTheDocument();
    expect(
        screen.getByText(myTicket.last_modified.toDateString())
    ).toBeInTheDocument();
    expect(screen.getByText(myTicket.status)).toBeInTheDocument();
    expect(screen.getByText(myTicket.assignee)).toBeInTheDocument();
    expect(screen.getByText(myTicket.image_path)).toBeInTheDocument();
});
test("Can switch into Edit Mode", () => {
    const switchButton = screen.getByRole("checkbox");
    switchButton.click();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getAllByRole("checkbox")).toHaveLength(2);
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

    const nameBox = screen.getByAltText(myTicket.title);
    userEvent.type(nameBox, "Computer problems");
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

    const descriptionBox = screen.getByAltText(myTicket.description);
    userEvent.type(descriptionBox, "This is the description of the ticket");
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

    const prioBox = screen.getByAltText(myTicket.priority);
    userEvent.type(prioBox, "5");
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

    const imageBox = screen.getByAltText(myTicket.image_path);
    userEvent.type(imageBox, "image.png");
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

    const statusBox = screen.getByAltText(myTicket.status);
    userEvent.type(statusBox, "Pending");
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

    const assignBox = screen.getByAltText(myTicket.assignee);
    userEvent.type(assignBox, "Victor Leclercq");
    expect(screen.getByText(/Victor Leclercq/i)).toBeInTheDocument();
});
