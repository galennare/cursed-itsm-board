import React from "react";
import { screen, render } from "@testing-library/react";
import { NavigationBar, UserRole } from "./NavigationBar";
import { Ticket } from "../Interface/TicketInterface";

const INITIAL_LIST: Ticket[] = [
    {
        id: "1",
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
        priority: 0,
        last_modified: new Date(),
        author: "Donald Trump",
        status: "In-Progress",
        assignee: "Nick DiGirolamo",
        image_path: "path_to_image"
    },
    {
        id: "3",
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

beforeEach(() => {
    render(
        <NavigationBar
            setUserRole={function (): void {
                throw new Error("Function not implemented.");
            }}
            centralList={[]}
            setCentralList={function (newList: Ticket[]): void {
                throw new Error("Function not implemented.");
            }}
        />
    );
});

test("Button to delete renders", () => {
    // this button was removed
});
