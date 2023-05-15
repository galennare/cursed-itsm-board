// credit to sjohnsonaz (on GitHub) MergeSort.ts for the MergeSort implimentation

import React, { ReactNode, useState } from "react";
import { Form } from "react-bootstrap";
import { UserRole } from "./NavigationBar";
import { Ticket } from "../Interface/TicketInterface";
import { centralProps } from "../App";

export default function MergeSort(
    items: Ticket[],
    accending: boolean
): Ticket[] {
    return divide(items, accending);
}

function divide(items: Ticket[], accending: boolean): Ticket[] {
    const halfLength = Math.ceil(items.length / 2);
    let low = items.slice(0, halfLength);
    let high = items.slice(halfLength);
    if (halfLength > 1) {
        low = divide(low, accending);
        high = divide(high, accending);
    }
    return combine(low, high, accending);
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
    const [sortState, setSortState] = useState("Default");
    function sortList(event: React.ChangeEvent<HTMLSelectElement>): void {
        setSortState(event.target.value);
        if (sortState === "ascending") {
            setCentralList(MergeSort(centralList, false));
        } else {
            setCentralList(MergeSort(centralList, true));
        }
    }
    return (
        <div>
            Sort By Priority:
            <br></br>
            <Form.Select
                role={"userSort"}
                id={"userSort"}
                defaultValue={"DEFAULT"}
                onChange={sortList}
            >
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
            </Form.Select>
        </div>
    );
}
