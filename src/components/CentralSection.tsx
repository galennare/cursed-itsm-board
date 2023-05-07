import React, { useState } from "react";
import { Ticket } from "../Interface/Ticket";
import { EnumStatus } from "../Interface/EnumStatus";

export function CentralListSection(
    ticketStatus: EnumStatus,
    ticketList: Ticket[] // TODO use ticket object
): JSX.Element {
    const tableElements: JSX.Element[] = ticketList.map((ticket) => {
        // TODO replace key with unique ticket id
        return (
            <div className={""} key={ticket.id}>
                <h6>{ticket.name}</h6>
            </div>
        );
    });

    // const [visible, setVisible] = useState<boolean>(false);
    return (
        <div>
            <div className={"List-Section"}>
                <h3 className={"List-Section-Title"}>
                    {ticketStatus}
                    {" Tickets ("}
                    {ticketList.length}
                    {")"}
                </h3>
                <hr></hr>
                {tableElements}
            </div>
        </div>
    );
}
