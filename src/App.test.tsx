import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders react link", () => {
    render(<App />);
    const linkElement = "a";
    expect(linkElement).toBeInTheDocument();
});
