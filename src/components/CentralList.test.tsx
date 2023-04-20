import React from "react";
import { render, screen } from "@testing-library/react";
import { CentralList } from "./CentralList";

describe("Counter Component tests", () => {
    beforeEach(() => {
        render(<CentralList />);
    });
    test("The initial value is 0", () => {
        const attemptNumber = screen.getByText(/(\d+)/);
        expect(attemptNumber).toBeInTheDocument();
    });
});
