import React, { useState } from "react";
import { EnumStatus } from "../interface/EnumStatus";

export function CentralListSection(
    ticketStatus: EnumStatus,
    ticketList: string[] // TODO use ticket object
): JSX.Element {
    const tableElements: JSX.Element[] = ticketList.map((ticket) => {
        // TODO replace key with unique ticket id
        return (
            <div className={""} key={ticket}>
                <h6>{ticket}</h6>
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
