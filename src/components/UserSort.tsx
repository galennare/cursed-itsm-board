import React, { ReactNode, useState } from "react";
import { Form } from "react-bootstrap";
import { UserRole } from "./NavigationBar";
import { Ticket } from "../Interface/TicketInterface";

export function UserSort({
    list,
    setList
}: {
    list: Ticket[];
    setList?: (newList: Ticket[]) => void; // Optional for testing DO NOT make this undefined
}): JSX.Element {
    const [sortState, setSortState] = useState("none");

    const sortMethods = (state: string) => {
        if (state === "accending") {
            return undefined;
        } else if (state === "decending") {
            return (a: Ticket, b: Ticket) => (a.priority > b.priority ? -1 : 1);
        } else {
            return (a: Ticket, b: Ticket) => null;
        }
    };
    return (
        <div>
            <Form.Select
                role={"userSort"}
                id={"userSort"}
                defaultValue={"DEFAULT"}
                onChange={(e) => setSortState(e.target.value)}
            >
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
            </Form.Select>
            <div>
                {list.sort().map((a: Ticket, i: number) => (
                    <div key={i}>{}</div>
                ))}
            </div>
        </div>
    );
}
