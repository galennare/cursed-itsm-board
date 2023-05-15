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
