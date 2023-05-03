import React from "react";
import { screen, render } from "@testing-library/react";
import { Preferences } from "./Preferences";

beforeEach(() => {
    render(<Preferences />);
});

test("There is a Preferences Button", () => {
    const prefsButton = screen.getByRole("button", { name: /Preferences/i });
    expect(prefsButton).toBeInTheDocument();
    expect(prefsButton).toBeEnabled();
});
