import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
//import userEvent from "@testing-library/user-event";
import { Ticket } from "./TicketItem";
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
/*test("There is one checkbox and no textboxes", () => {
    const switchButton = screen.getByRole("checkbox");
    expect(switchButton).toBeInTheDocument();
    expect(switchButton.parentElement).toHaveClass("form-switch");
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
});
test("Initial text should be 'Your Name is a student'.", () => {
    expect(screen.getByText(/Your Name is a student/i)).toBeInTheDocument();
});
test("Can switch into Edit Mode", () => {
    const switchButton = screen.getByRole("checkbox");
    switchButton.click();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getAllByRole("checkbox")).toHaveLength(2);
});
test("Editing the name and student status changes the text", () => {
    const switchButton = screen.getByRole("checkbox");
    switchButton.click();
    const nameBox = screen.getByRole("textbox");
    userEvent.type(nameBox, "Ada Lovelace");
    const studentBox = screen.getByRole("checkbox", { name: /student/i });
    studentBox.click();
    switchButton.click();
    expect(
        screen.getByText(/Ada Lovelace is not a student/i)
    ).toBeInTheDocument();
});
test("Different name, click student box twice changes the text", () => {
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
