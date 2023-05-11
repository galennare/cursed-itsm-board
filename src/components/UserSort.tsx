import React, { ReactNode, useState } from "react";
import { Form } from "react-bootstrap";
import { UserRole } from "./NavigationBar";
import { Ticket } from "../Interface/TicketInterface";
import { centralProps } from "../App";

export default function MergeSort(items: Ticket[]): Ticket[] {
    return divide(items);
}

function divide(items: Ticket[]): Ticket[] {
    const halfLength = Math.ceil(items.length / 2);
    let low = items.slice(0, halfLength);
    let high = items.slice(halfLength);
    if (halfLength > 1) {
        low = divide(low);
        high = divide(high);
    }
    return combine(low, high);
}

function combine(low: Ticket[], high: Ticket[]): Ticket[] {
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
                if (lowItem.priority <= highItem.priority) {
                    combined.push(lowItem);
                    indexLow++;
                } else {
                    combined.push(highItem);
                    indexHigh++;
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
    function sortList(): void {
        setCentralList(MergeSort(centralList));
    }

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
                onChange={sortList}
            >
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
            </Form.Select>
        </div>
    );
}
