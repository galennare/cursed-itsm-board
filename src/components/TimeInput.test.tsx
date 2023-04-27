import React from "react";
import { act, render } from "@testing-library/react";
import { TimeInput } from "./TimeInput";

test("renders 2 numeric fields", () => {
    const { container } = render(
        <TimeInput
            expectedTime={0}
            actualTime={0}
            onSave={() => {
                return;
            }}
        />
    );
    const input = container.querySelectorAll("input");
    expect(input).toHaveLength(2);
});
test("renders an edit button", () => {
    const { container, getByText } = render(
        <TimeInput
            expectedTime={0}
            actualTime={0}
            onSave={() => {
                return;
            }}
        />
    );
    const input = container.querySelector("button");
    expect(input).toBeInTheDocument();
    expect(getByText("Edit")).toBeInTheDocument();
});

test("edit button enables input fields", () => {
    const { container } = render(
        <TimeInput
            expectedTime={0}
            actualTime={0}
            onSave={() => {
                return;
            }}
        />
    );
    const button = container.querySelector("button");
    expect(button).toBeInTheDocument();
    act(() => {
        button?.click();
    });

    const inputs = container.querySelectorAll("input");
    for (const input in inputs.values()) {
        expect(input).toBeEnabled();
    }

    act(() => {
        button?.click();
    });

    for (const input in inputs.values()) {
        expect(input).toBeDisabled();
    }
});
