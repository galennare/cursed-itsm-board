import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import { EditTicket } from "./Edit_Mode_Ticket";
import { TicketDatabase } from "../TicketDatabase";
import userEvent from "@testing-library/user-event";
import { Ticket } from "./TicketItem";
//import { takeCoverage } from "v8";

beforeEach(() => {
    const MY_LIST: Ticket[] = [
        {
            id: 1,
            title: "Computer Issues",
            description: "This is the description for ticket one.",
            priority: 0,
            last_modified: new Date(),
            author: "Joe Biden",
            status: "New",
            assignee: "Nick DiGirolamo",
            image_path: "path_to_image"
        },
        {
            id: 2,
            title: "My Phone Died",
            description: "This is the description for ticket two.",
            priority: 0,
            last_modified: new Date(),
            author: "Donald Trump",
            status: "In-Progress",
            assignee: "Nick DiGirolamo",
            image_path: "path_to_image"
        },
        {
            id: 3,
            title: "No WIFI?",
            description: "This is the description for ticket three.",
            priority: 0,
            last_modified: new Date(),
            author: "Barack Obama",
            status: "Resolved",
            assignee: "Nick DiGirolamo",
            image_path: "path_to_image"
        }
    ];

    const ticketDataB = new TicketDatabase(MY_LIST);

    render(<EditTicket ticket={ticketDataB.getCentralList()[1]}></EditTicket>);
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
