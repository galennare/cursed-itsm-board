import React from "react";
import { Ticket, TicketItem } from "./TicketItem";
import { Hook } from "../TicketDatabase";

export function TicketList({
    ticket_hooks
}: {
    ticket_hooks: Hook<Ticket>[];
}): JSX.Element {
    return (
        <div className={"ticket_list"}>
            {ticket_hooks.map((ticket_hook: Hook<Ticket>) => (
                <TicketItem
                    key={ticket_hook[0].id}
                    ticket_hook={ticket_hook}
                ></TicketItem>
            ))}
        </div>
    );
}
