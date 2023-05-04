import React from "react";
import { render, screen } from "@testing-library/react";
import { CentralList } from "./CentralList";

describe("Counter Component tests", () => {
    beforeEach(() => {
        render(<CentralList />);
    });
    test("There is a list", () => {
        const listName = screen.getByText(/Central List/i);
        expect(listName).toBeInTheDocument();
    });
});
