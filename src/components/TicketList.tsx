import React, { useState } from "react";
import { TicketItem } from "./TicketItem";
import { useDrop } from "react-dnd";
import { UserRole } from "./NavigationBar";
import { Hook } from "../TicketDatabase";
import { Ticket } from "../Interface/TicketInterface";

export function TicketList({
    list,
    setList
}: {
    list: Ticket[];
    setList: (list: Ticket[]) => void;
}): JSX.Element {
    const addTicket = (ticket: Ticket) => {
        console.log("Detected drop. Before: " + list.length);
        setList([...list, ticket]);
        console.log("Detected drop. After: " + list.length);
    };

    const [, drop] = useDrop(() => ({
        accept: "TicketItem",
        drop: (ticket: Ticket) => addTicket(ticket)
    }));

    return (
        <div
            className={"ticket_list"}
            role={"ticket_list"}
            ref={drop}
            style={{
                height: "1000px",
                display: "flex",
                flexDirection: "column"
            }}
        >
            {list.map((ticket: Ticket) => (
                <TicketItem key={ticket.id} ticket={ticket} />
            ))}

            <div style={{ flex: "1 1 0%" }} />
        </div>
    );
}
