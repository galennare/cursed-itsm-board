import React, { useState } from "react";
import { TicketItem } from "./TicketItem";
import { useDrop } from "react-dnd";
import { Ticket } from "../Interface/TicketInterface";
import { UserRole } from "./NavigationBar";

export function TicketList({
    title,
    userRole,
    requiredRole,
    list,
    setList
}: {
    title: string;
    userRole: UserRole;
    requiredRole: UserRole;
    list: Ticket[];
    setList: (newTicket: Ticket[]) => void;
}): JSX.Element {
    const [, drop] = useDrop(
        () => ({
            accept: "TicketItem",
            drop: onDrop
        }),
        [list, userRole]
    );

    function onDrop(ticket: { ticket: Ticket }): void {
        let roleValue = 0;
        roleValue = userRole == UserRole.User ? 1 : roleValue;
        roleValue = userRole == UserRole.Admin ? 2 : roleValue;
        roleValue = userRole == UserRole.Super ? 3 : roleValue;
        if (
            (roleValue < 2 && requiredRole == UserRole.Admin) ||
            (roleValue < 3 && requiredRole == UserRole.Super)
        ) {
            alert("You do not have permission to add to that list.");
        } else {
            setList([...list, ticket.ticket]);
        }
    }

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
