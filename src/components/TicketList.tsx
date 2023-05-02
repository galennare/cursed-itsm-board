import React from "react";
import { Ticket, TicketItem } from "./TicketItem";
import { useDrop } from "react-dnd";
import { UserRole } from "./NavigationBar";
import { Hook, TicketDatabase } from "../TicketDatabase";

export function TicketList({
    ticketDB,
    ticket_hooks,
    type
}: {
    ticketDB: TicketDatabase;
    ticket_hooks: Hook<Ticket>[];
    type: UserRole;
}): JSX.Element {
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: "TicketItem",
        drop: (item: Hook<Ticket>) => {
            if (type == UserRole.Admin) {
                alert("Dropped on Admin!");
                ticketDB.addTicketToAdminList(item[0]);
            }
            if (type == UserRole.User) {
                alert("Dropped on User!");
                ticketDB.addTicketToUserList(item[0], UserRole.User);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    }));

    return (
        <div
            className={"ticket_list"}
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
