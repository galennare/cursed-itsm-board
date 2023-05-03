import React, { useState } from "react";
import { TicketItem } from "./TicketItem";
import { Ticket } from "../Interface/TicketInterface";
import { Hook } from "../TicketDatabase";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const INITIAL_ADMIN_LIST: Ticket[] = [
    {
        id: 1,
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
        id: 2,
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
        id: 3,
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

export function AdminList(): JSX.Element {
    // const [adminList, setList] = useState<Ticket[]>(INITIAL_ADMIN_LIST);
    const [adminList] = useState<Ticket[]>(INITIAL_ADMIN_LIST);

    /*
    These are currently not used because I haven't made buttons for them yet.
    Commented out because otherwise they cause the build to fail.

    function addTicket(ticket: Ticket): void {
        setList([...adminList, ticket]);
    }

    function removeTicket(id: number) {
        const modifiedList = adminList.filter(
            (ticket: Ticket) => ticket.id != id
        );
        setList(modifiedList);
    }
    */

    const newTicket: Ticket = {
        id: 1,
        title: "Computer Issues",
        description: "This is the description for ticket one.",
        priority: 0,
        last_modified: new Date(),
        author: "Joe Biden",
        status: "Pending",
        assignee: "Nick DiGirolamo",
        image_path: "path_to_image"
    };

    function TicketItemHookWrapper(): JSX.Element {
        const ticketHook: Hook<Ticket> = useState<Ticket>(newTicket);

        return (
            <DndProvider backend={HTML5Backend}>
                <TicketItem ticket_hook={ticketHook} />
            </DndProvider>
        );
    }

    return (
        <div className="AdminList" style={{ float: "left", width: "33%" }}>
            <h1>Admin List</h1>
            {adminList.map((ticket: Ticket) => (
                <TicketItem
                    key={ticket.id}
                    ticket_hook={[ticket, TicketItemHookWrapper]}
                ></TicketItem>
            ))}
        </div>
    );
}
