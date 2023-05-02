import React from "react";
import { screen, render } from "@testing-library/react";
import { RevealTicket } from "./RevealTicket";

beforeEach(() => {
    render(<RevealTicket />);
});

test("There is a RevealTicket Button", () => {
    const prefsButton = screen.getByRole("button", { name: /RevealTicket/i });
    expect(prefsButton).toBeInTheDocument();
    expect(prefsButton).toBeEnabled();
});
