import React, { useState } from "react";
import { TicketItem } from "./TicketItem";
import { useDrop } from "react-dnd";
import { Ticket } from "../Interface/TicketInterface";
import { UserRole } from "./NavigationBar";

export function allowedToDrop(
    userRole: UserRole,
    requiredRole: UserRole
): boolean {
    let roleValue = 0;
    roleValue = userRole == UserRole.User ? 1 : roleValue;
    roleValue = userRole == UserRole.Admin ? 2 : roleValue;
    roleValue = userRole == UserRole.Super ? 3 : roleValue;
    return !(
        (roleValue < 2 && requiredRole == UserRole.Admin) ||
        (roleValue < 3 && requiredRole == UserRole.Super)
    );
}

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
    setList: (list: Ticket[]) => void;
}): JSX.Element {
    function deleteTicket(ticket: Ticket): void {
        // check for permission to delete
        if (allowedToDrop(userRole, requiredRole)) {
            // delete the ticket
            const ticketIndex = list.findIndex(
                (q: Ticket) => q.id == ticket.id
            );
            const newList = [...list];
            if (ticketIndex > -1) newList.splice(ticketIndex, 1);
            setList(newList);
        } else {
            alert("You do not have permission to delete this ticket.");
        }
    }

    const [, drop] = useDrop(
        () => ({
            accept: "TicketItem",
            drop: (ticket: Ticket) => {
                if (allowedToDrop(userRole, requiredRole)) {
                    setList([...list, ticket]);
                } else {
                    alert("You do not have permission to add to that list.");
                }
            }
        }),
        [list, userRole]
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
                <TicketItem
                    key={ticket.id}
                    ticket={ticket}
                    deleteTicket={deleteTicket}
                />
            ))}
            <div style={{ flex: "1 1 0%" }} />
        </div>
    );
}
