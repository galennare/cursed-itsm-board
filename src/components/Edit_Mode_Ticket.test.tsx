import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Ticket, TicketItem } from "./TicketItem";
import { EditTicket } from "./Edit_Mode_Ticket";
import { Hook, TicketDatabase } from "../TicketDatabase";
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
    const switchButton = screen.getByRole("checkbox");
    switchButton.click();
    const nameBox = screen.getByRole("textbox");
    userEvent.type(nameBox, "Computer problems");
    switchButton.click();
    expect(screen.getByText(/Computer problems/i)).toBeInTheDocument();
});
test("Editing the description changes the description text", () => {
    const switchButton = screen.getByRole("checkbox");
    switchButton.click();
    const descriptionBox = screen.getByRole("textbox");
    userEvent.type(descriptionBox, "This is the description of the ticket");
    switchButton.click();
    expect(
        screen.getByText(/This is the description of the ticket/i)
    ).toBeInTheDocument();
});
test("Editing the priority changes the priority text", () => {
    const switchButton = screen.getByRole("checkbox");
    switchButton.click();
    const prioBox = screen.getByRole("textbox");
    userEvent.type(prioBox, "5");
    switchButton.click();
    expect(screen.getByText(/5/i)).toBeInTheDocument();
});
test("Editing the image changes the image text", () => {
    const switchButton = screen.getByRole("checkbox");
    switchButton.click();
    const imageBox = screen.getByRole("textbox");
    userEvent.type(imageBox, "image.png");
    switchButton.click();
    expect(screen.getByText(/image.png/i)).toBeInTheDocument();
});
test("Editing the status changes the dropdown option", () => {
    const switchButton = screen.getByRole("checkbox");
    switchButton.click();
    const statusBox = screen.getByRole("status");
    userEvent.type(statusBox, "Pending");
    switchButton.click();
    expect(screen.getByText(/Pending/i)).toBeInTheDocument();
});
test("Editing the assignee changes the assignee text", () => {
    const switchButton = screen.getByRole("checkbox");
    switchButton.click();
    const assignBox = screen.getByRole("textbox");
    userEvent.type(assignBox, "Victor Leclercq");
    switchButton.click();
    expect(screen.getByText(/Victor Leclercq/i)).toBeInTheDocument();
});
/*test("Different name, click student box twice changes the text", () => {
    const switchButton = screen.getByRole("checkbox");
    switchButton.click();
    const nameBox = screen.getByRole("textbox");
    userEvent.type(nameBox, "Alan Turing");
    const studentBox = screen.getByRole("checkbox", { name: /student/i });
    studentBox.click();
    studentBox.click();
    switchButton.click();
    expect(screen.getByText(/Alan Turing is a student/i)).toBeInTheDocument();
});*/
