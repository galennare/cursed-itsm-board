import React from "react";
import { screen, render } from "@testing-library/react";
import { TicketButton } from "./TicketButton";

beforeEach(() => {
    render(<TicketButton />);
});

test("There is a TicketButton Button", () => {
    const ticketButton = screen.getByRole("button", {
        name: /View All My Tickets/i
    });
    expect(ticketButton).toBeInTheDocument();
    expect(ticketButton).toBeEnabled();
});
