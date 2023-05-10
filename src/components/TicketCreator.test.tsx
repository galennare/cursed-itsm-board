import React, { useState } from "react";
import {
    CreateTicket,
    TicketCreator,
    convertToPriority
} from "./TicketCreator";
import { Ticket } from "../Interface/TicketInterface";
import { screen, render } from "@testing-library/react";
import { v4 } from "uuid";

test("TicketCreator is rendering.", () => {
    function TicketCreatorHookWrapper(): JSX.Element {
        const [list, setList] = useState<Ticket[]>([]);
        return <TicketCreator list={list} setList={setList} />;
    }

    render(<TicketCreatorHookWrapper />);
    const ticketCreator = screen.getByRole("ticket_creator");
    expect(ticketCreator).toBeInTheDocument();
});

test("CreateTicket is working properly", () => {
    const expected_ticket: Ticket = {
        id: v4(),
        title: "test",
        description: "test",
        priority: 0,
        last_modified: new Date(),
        author: "test",
        status: "Pending",
        assignee: "test",
        image_path: "path_to_image"
    };
    const actual_ticket: Ticket = CreateTicket(
        "test",
        "test",
        0,
        "test",
        "test"
    );
    expect(expected_ticket.title == actual_ticket.title).toBeTruthy();
    expect(
        expected_ticket.description == actual_ticket.description
    ).toBeTruthy();
    expect(expected_ticket.priority == actual_ticket.priority).toBeTruthy();
    expect(expected_ticket.author == actual_ticket.author).toBeTruthy();
    expect(expected_ticket.assignee == actual_ticket.assignee).toBeTruthy();
});

test("convertToPriority is working properly.", () => {
    expect(convertToPriority(-1) == 0).toBeTruthy();
    expect(convertToPriority(0) == 0).toBeTruthy();
    expect(convertToPriority(1) == 1).toBeTruthy();
    expect(convertToPriority(2) == 2).toBeTruthy();
    expect(convertToPriority(3) == 3).toBeTruthy();
    expect(convertToPriority(4) == 4).toBeTruthy();
    expect(convertToPriority(5) == 5).toBeTruthy();
    expect(convertToPriority(6) == 5).toBeTruthy();
});
