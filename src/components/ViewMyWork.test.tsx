import React from "react";
import { screen, render } from "@testing-library/react";
import { ViewMyWork } from "./ViewMyWork";

beforeEach(() => {
    render(<ViewMyWork />);
});

test("There is a ViewMyWork Button", () => {
    const viewButton = screen.getByRole("button", {
        name: /View My Work/i
    });
    expect(viewButton).toBeInTheDocument();
    expect(viewButton).toBeEnabled();
});
