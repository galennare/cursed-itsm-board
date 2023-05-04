import React from "react";
import { screen, render } from "@testing-library/react";
import { NavigationBar } from "./NavigationBar";
import { UserRole } from "../interfaces/UserRole";

beforeEach(() => {
    render(
        <NavigationBar
            userRole={UserRole.Admin}
            setUserRole={function (): void {
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
