import React from "react";
import { TicketItem } from "./TicketItem";
import { useDrop } from "react-dnd";
import { UserRole } from "../interfaces/UserRole";
import { Hook } from "../interfaces/Hook";
import { Ticket } from "../interfaces/Ticket";

export function TicketList({
    ticket_hooks,
    list_type
}: {
    ticket_hooks: Hook<Ticket>[];
    list_type: UserRole;
}): JSX.Element {
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: "TicketItem",
        drop: (item: Hook<Ticket>) => {
            alert("You dropped a ticket into a list.");
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
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
            {ticket_hooks.map((ticket_hook: Hook<Ticket>) => (
                <TicketItem
                    key={ticket_hook[0].id}
                    ticket_hook={ticket_hook}
                ></TicketItem>
            ))}

            <div style={{ flex: "1 1 0%" }} />
        </div>
    );
}
