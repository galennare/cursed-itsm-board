import React from "react";
import { screen, render } from "@testing-library/react";
import { NavigationBar, UserRole } from "./NavigationBar";

beforeEach(() => {
    render(
        <NavigationBar
            setUserRole={function (): void {
                throw new Error("Function not implemented.");
            }}
        />
    );
});

test("Button to delete renders", () => {
    // this button was removed
});
