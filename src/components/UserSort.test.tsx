import React from "react";
import { render, screen } from "@testing-library/react";
import MergeSort, { UserSort } from "./UserSort";
import { Ticket } from "../Interface/TicketInterface";
import { v4 } from "uuid";

const INITIAL_LIST: Ticket[] = [
    {
        id: "0",
        title: "Computer Issues",
        description: "This is the description for ticket one.",
        priority: 0,
        last_modified: new Date(),
        author: "Joe Biden",
        status: "Pending",
        assignee: "Nick DiGirolamo",
        image_path: "path_to_image"
    },
    {
        id: "2",
        title: "My Phone Died",
        description: "This is the description for ticket two.",
        priority: 1,
        last_modified: new Date(),
        author: "Donald Trump",
        status: "In-Progress",
        assignee: "Nick DiGirolamo",
        image_path: "path_to_image"
    },
    {
        id: "1",
        title: "No WIFI?",
        description: "This is the description for ticket three.",
        priority: 0,
        last_modified: new Date(),
        author: "Barack Obama",
        status: "Resolved",
        assignee: "Nick DiGirolamo",
        image_path: "path_to_image"
    }
];

const accending: Ticket[] = [
    {
        id: "0",
        title: "Computer Issues",
        description: "This is the description for ticket one.",
        priority: 0,
        last_modified: new Date(),
        author: "Joe Biden",
        status: "Pending",
        assignee: "Nick DiGirolamo",
        image_path: "path_to_image"
    },
    {
        id: "1",
        title: "No WIFI?",
        description: "This is the description for ticket three.",
        priority: 0,
        last_modified: new Date(),
        author: "Barack Obama",
        status: "Resolved",
        assignee: "Nick DiGirolamo",
        image_path: "path_to_image"
    },
    {
        id: "2",
        title: "My Phone Died",
        description: "This is the description for ticket two.",
        priority: 1,
        last_modified: new Date(),
        author: "Donald Trump",
        status: "In-Progress",
        assignee: "Nick DiGirolamo",
        image_path: "path_to_image"
    }
];

test("renders a dropdown", () => {
    render(
        <UserSort
            centralList={[]}
            setCentralList={function (newList: Ticket[]): void {
                throw new Error("Function not implemented.");
            }}
        />
    );
    const sort = screen.getByRole("userSort");
    expect(sort).toBeInTheDocument();
});

test("sorts correctly", () => {
    const sorted = MergeSort(INITIAL_LIST, true);
    expect(sorted).toEqual(accending);
});
