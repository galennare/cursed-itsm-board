import React from "react";
import { screen, render } from "@testing-library/react";
import { RevealTicket } from "./RevealTicket";

beforeEach(() => {
    render(<RevealTicket />);
});

test("There is a RevealTicket Button", () => {
    const revealButton = screen.getByRole("button", { name: /RevealTicket/i });
    expect(revealButton).toBeInTheDocument();
    expect(revealButton).toBeEnabled();
});
