import React, { useState } from "react";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { EnumStatus } from "../interface/EnumStatus";

export function CentralListSection(
    ticketStatus: EnumStatus,
    ticketList: string[] // TODO use ticket object
): JSX.Element {
    const tableElements: JSX.Element[] = ticketList.map((ticket) => {
        // TODO replace key with unique ticket id
        return (
            <Card
                body
                color="primary"
                outline
                style={{
                    width: "18rem",
                    outlineColor: "white"
                }}
                key={ticket}
            >
                <CardBody>
                    <CardSubtitle tag={"h6"}>{ticket}</CardSubtitle>
                </CardBody>
            </Card>
        );
    });

    // const [visible, setVisible] = useState<boolean>(false);
    return (
        <Card
            body
            color="primary"
            outline
            style={{
                width: "18rem",
                outlineColor: "white"
            }}
        >
            <CardBody>
                <CardTitle tag={"h3"}>{ticketStatus}</CardTitle>
                {tableElements}
            </CardBody>
        </Card>
    );
}
