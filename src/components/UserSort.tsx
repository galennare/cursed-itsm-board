// credit to sjohnsonaz (on GitHub) MergeSort.ts for the MergeSort implimentation

import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Ticket } from "../Interface/TicketInterface";
import { centralProps } from "../App";

export default function Sort(items: Ticket[], ascending: boolean): Ticket[] {
    let newItems = [...items];
    if (ascending) {
        newItems = newItems.sort(function (a, b) {
            return a.priority - b.priority;
        });
    } else {
        newItems = newItems.sort(function (a, b) {
            return b.priority - a.priority;
        });
    }
    return newItems;
}

export function UserSort({
    centralList,
    setCentralList
}: centralProps): JSX.Element {
    const [sortState, setSortState] = useState<string>("descending");
    /* istanbul ignore next */
    function handleSortState(event: React.ChangeEvent<HTMLSelectElement>) {
        setSortState(event.target.value);
    }
    function sortList(event: React.ChangeEvent<HTMLSelectElement>): void {
        handleSortState(event);
        if (sortState === "ascending") {
            setCentralList(Sort(centralList, true));
        } else {
            setCentralList(Sort(centralList, false));
        }
    }
    return (
        <div>
            <Form.Group controlId="userSort">
                <Form.Label>Sort by Priority:</Form.Label>
                <br></br>
                <Form.Select
                    role={"userSort"}
                    id={"userSort"}
                    value={sortState}
                    onChange={sortList}
                >
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                </Form.Select>
            </Form.Group>
        </div>
    );
}
