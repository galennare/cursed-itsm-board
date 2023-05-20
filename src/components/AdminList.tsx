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

export function AdminList({
    title,
    userRole,
    requiredRole,
    userList,
    adminList,
    centralList,
    setUserList,
    setAdminList,
    setCentralList
}: {
    title: string;
    userRole: UserRole;
    requiredRole: UserRole;
    userList: Ticket[];
    adminList: Ticket[];
    centralList: Ticket[];
    setUserList: StateSetter<Ticket[]>;
    setAdminList: StateSetter<Ticket[]>;
    setCentralList: StateSetter<Ticket[]>;
}): JSX.Element {
    function deleteTicket(ticket: Ticket): void {
        // check for permission to delete
        if (allowedToDrop(userRole, requiredRole)) {
            // delete the ticket
            const ticketIndex = adminList.findIndex(
                (q: Ticket) => q.id == ticket.id
            );
            const newList = [...adminList];
            if (ticketIndex > -1) newList.splice(ticketIndex, 1);
            setAdminList(newList);
        } else {
            alert("You do not have permission to delete this ticket.");
        }
    }

    function ticketSetter(ticket: Ticket): void {
        // update ticket properties in admin list
        const adminIndex = adminList.findIndex(
            (q: Ticket) => q.id === ticket.id
        );
        const newAdminTicketList = [...adminList];
        if (adminIndex > -1) newAdminTicketList.splice(adminIndex, 1, ticket);
        setAdminList(newAdminTicketList);

        // update ticket in user list
        const userIndex = userList.findIndex((q: Ticket) => q.id === ticket.id);
        const newUserTicketList = [...userList];
        if (userIndex > -1) newUserTicketList.splice(userIndex, 1, ticket);
        setUserList(newUserTicketList);

        // update ticket in central list
        const centralIndex = centralList.findIndex(
            (q: Ticket) => q.id === ticket.id
        );
        const newCentralTicketList = [...centralList];
        if (centralIndex > -1)
            newCentralTicketList.splice(centralIndex, 1, ticket);
        setCentralList(newCentralTicketList);
    }

    const [, drop] = useDrop(
        () => ({
            accept: "TicketItem",
            drop: (ticket: Ticket) => {
                if (allowedToDrop(userRole, requiredRole)) {
                    if (
                        adminList.find(
                            (oldTicket: Ticket): boolean =>
                                oldTicket.id == ticket.id
                        )
                    ) {
                        alert("That ticket is already in that list!");
                    } else {
                        setAdminList([...adminList, ticket]);
                    }
                } else {
                    alert("You do not have permission to add to that list.");
                }
            }
        }),
        [adminList, userRole]
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
            {adminList.map((ticket: Ticket) => (
                <TicketItemEditable
                    key={ticket.id}
                    ticket={ticket}
                    ticketSetter={ticketSetter}
                    deleteTicket={deleteTicket}
                />
            ))}
            <div style={{ flex: "1 1 0%" }} />
        </div>
    );
}
