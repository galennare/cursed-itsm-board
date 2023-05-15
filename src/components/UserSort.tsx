// credit to sjohnsonaz (on GitHub) MergeSort.ts for the MergeSort implimentation

import React, { ReactNode, useState } from "react";
import { Form } from "react-bootstrap";
import { UserRole } from "./NavigationBar";
import { Ticket } from "../Interface/TicketInterface";
import { centralProps } from "../App";

export default function MergeSort(
    items: Ticket[],
    ascending: boolean
): Ticket[] {
    return divide(items, ascending);
}

function divide(items: Ticket[], ascending: boolean): Ticket[] {
    const halfLength = Math.ceil(items.length / 2);
    let low = items.slice(0, halfLength);
    let high = items.slice(halfLength);
    if (halfLength > 1) {
        low = divide(low, ascending);
        high = divide(high, ascending);
    }
    return combine(low, high, ascending);
}

function combine(low: Ticket[], high: Ticket[], accending: boolean): Ticket[] {
    let indexLow = 0;
    let indexHigh = 0;
    const lengthLow = low.length;
    const lengthHigh = high.length;
    const combined = [];
    while (indexLow < lengthLow || indexHigh < lengthHigh) {
        const lowItem = low[indexLow];
        const highItem = high[indexHigh];
        if (lowItem !== undefined) {
            if (highItem === undefined) {
                combined.push(lowItem);
                indexLow++;
            } else {
                if (accending) {
                    if (lowItem.priority <= highItem.priority) {
                        combined.push(lowItem);
                        indexLow++;
                    } else {
                        combined.push(highItem);
                        indexHigh++;
                    }
                } else {
                    if (lowItem.priority >= highItem.priority) {
                        combined.push(lowItem);
                        indexLow++;
                    } else {
                        combined.push(highItem);
                        indexHigh++;
                    }
                }
            }
        } else {
            if (highItem !== undefined) {
                combined.push(highItem);
                indexHigh++;
            }
        }
    }
    return combined;
}

export function UserSort({
    centralList,
    setCentralList
}: centralProps): JSX.Element {
    const [sortState, setSortState] = useState<string>("descending");
    function handleSortState(event: React.ChangeEvent<HTMLSelectElement>) {
        setSortState(event.target.value);
    }
    function sortList(event: React.ChangeEvent<HTMLSelectElement>): void {
        handleSortState(event);
        if (sortState === "ascending") {
            setCentralList(MergeSort(centralList, true));
        } else {
            setCentralList(MergeSort(centralList, false));
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
