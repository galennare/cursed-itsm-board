import React from "react";
import { screen, render } from "@testing-library/react";
import { NavigationBar, UserRole } from "./NavigationBar";

beforeEach(() => {
    render(
        <NavigationBar
            role={UserRole.Admin}
            setRole={function (): void {
                throw new Error("Function not implemented.");
            }}
        />
    );
});

test("Button to delete renders", () => {
    const addButton = screen.getByRole("button", {
        name: /Delete This Button/i
    });
    expect(addButton).toBeInTheDocument();
    expect(addButton).toBeEnabled();
});
