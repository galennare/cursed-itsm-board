import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Ticket } from "./TicketItem";

const initialList: Ticket[] = [
    {
        id: 1,
        title: "Computer Issues",
        description: "This is the description for ticket one.",
        priority: 0,
        last_modified: new Date(),
        author: "Joe Biden",
        status: "In-Progress",
        assignee: "Nick DiGirolamo",
        image_path: "path_to_image"
    }
];

function mappedList(): JSX.Element[] {
    return initialList.map((ticket: Ticket) => (
        <div
            key={ticket.id}
            style={{
                border: "5px solid black",
                margin: "10px"
            }}
        >
            <h1>{ticket.title}</h1>
            <h4>Author: {ticket.author}</h4>
            <h4> Assigned To: {ticket.assignee}</h4>
            <div>
                Status: {ticket.status} Priority: {ticket.priority}
            </div>
            <p>{ticket.description}</p>
        </div>
    ));
}

export function RevealTicket(): JSX.Element {
    const [reveal, setReveal] = useState<boolean>(false);
    return (
        <span>
            <Button
                style={{
                    width: "1000px",
                    padding: "10px",
                    backgroundColor: "white"
                }}
                onClick={() => setReveal(!reveal)}
            >
                <div>{mappedList()}</div>
            </Button>
            {reveal ? mappedList() : ""}
        </span>
    );
}
