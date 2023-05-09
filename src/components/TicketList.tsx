import React, { useState } from "react";
import { TicketItem } from "./TicketItem";
import { useDrop } from "react-dnd";
import { UserRole } from "./NavigationBar";
import { Hook } from "../TicketDatabase";
import { Ticket } from "../Interface/TicketInterface";

export function TicketList({
    title,
    list,
    setList
}: {
    title: string;
    list: Ticket[];
    setList: (newTicket: Ticket[]) => void;
}): JSX.Element {
    const [, drop] = useDrop(
        () => ({
            accept: "TicketItem",
            drop: (ticket: { ticket: Ticket }) => {
                setList([...list, ticket.ticket]);
            }
        }),
        [list]
    );

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
            <h1>{title}</h1>
            {list.map((ticket: Ticket) => (
                <TicketItem key={ticket.id} ticket={ticket} />
            ))}
            <div style={{ flex: "1 1 0%" }} />
        </div>
    );
}
