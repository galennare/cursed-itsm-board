import React, { useState } from "react";
import { TicketItem } from "./TicketItem";
import { useDrop } from "react-dnd";
import { Ticket } from "../Interface/TicketInterface";
import { UserRole } from "./NavigationBar";
import { TicketItemEditable } from "./TicketItemEditable";
import { StateSetter } from "../Interface/Hook";

/*
    This is a UI component. This component is just like the generic
    TicketList component but it renders TicketItemEditable components
    for each ticket because items in the admin list need to be
    editable by the admin and super.
*/

export function canDrop(userRole: UserRole, requiredRole: UserRole): boolean {
    let roleValue = 0;
    roleValue = userRole == UserRole.User ? 1 : roleValue;
    roleValue = userRole == UserRole.Admin ? 2 : roleValue;
    roleValue = userRole == UserRole.Super ? 3 : roleValue;
    return !(
        (roleValue < 2 && requiredRole == UserRole.Admin) ||
        (roleValue < 3 && requiredRole == UserRole.Super)
    );
}

export function AdminList({
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
    setList: StateSetter<Ticket[]>;
}): JSX.Element {
    function ticketSetter(ticket: Ticket): void {
        // find the ticket index in the list by ID
        const index = list.findIndex((q: Ticket) => q.id === ticket.id);

        // clone the ticket list
        const newTicketList = [...list];

        // replace the ticket
        if (index > -1) newTicketList.splice(index, 1, ticket);

        // call setter for ticket list
        setList(newTicketList);
    }

    const [, drop] = useDrop(
        () => ({
            accept: "TicketItem",
            drop: (ticket: { ticket: Ticket }) => {
                if (canDrop(userRole, requiredRole)) {
                    setList([...list, ticket.ticket]);
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
                <TicketItemEditable
                    key={ticket.id}
                    ticket={ticket}
                    ticketSetter={ticketSetter}
                />
            ))}
            <div style={{ flex: "1 1 0%" }} />
        </div>
    );
}
