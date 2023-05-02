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

test("renders correctly with undefined parameters", () => {
    const { container, getByText } = render(
        <TimeInput />
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
    inputs.forEach((input) => {
        expect(input).toBeEnabled();
    });

    act(() => {
        button?.click();
    });

    inputs.forEach((input) => {
        expect(input).toBeDisabled();
    });
});

test("edit time fields", () => {
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
    inputs.forEach((input) => {
        act(() => {
            input.stepUp(30);
            input.dispatchEvent(new Event('change', { bubbles: true }));
        });
    });

    act(() => {
        button?.click();
    });

    inputs.forEach((input) => {
        expect(input.value).toEqual("3");
    });
});
