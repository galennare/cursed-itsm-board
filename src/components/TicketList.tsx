import React, { useState } from "react";
import { TicketItem } from "./TicketItem";
import { useDrop } from "react-dnd";
import { Ticket } from "../Interface/TicketInterface";
import { UserRole } from "./NavigationBar";

export function TicketList({
    title,
    role,
    requiredRole,
    list,
    setList
}: {
    title: string;
    role: UserRole;
    requiredRole: UserRole;
    list: Ticket[];
    setList: (newTicket: Ticket[]) => void;
}): JSX.Element {
    const [, drop] = useDrop(
        () => ({
            accept: "TicketItem",
            drop: (ticket: { ticket: Ticket }) => {
                let roleVal = 0;
                // I know below is ugly and too long, but prettier/prettier's
                // formatting was not working and was stuck in a format loop.
                // eslint-disable-next-line prettier/prettier
                roleVal = role == UserRole.None ? 0 : role == UserRole.User ? 1 : role == UserRole.Admin ? 3 : 4;

                if (
                    (roleVal < 2 && requiredRole == UserRole.Admin) ||
                    (roleVal < 3 && requiredRole == UserRole.Super)
                ) {
                    alert(
                        "You cannot add tickets to that list. Your role is " +
                            role +
                            " and it needs to be " +
                            requiredRole +
                            " or higher."
                    );
                } else {
                    setList([...list, ticket.ticket]);
                }
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
