import React, { useState } from "react";
import { TicketItem } from "./TicketItem";
import { Ticket } from "../Interface/TicketInterface";
import { Hook } from "../TicketDatabase";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TicketList } from "./TicketList";

export function AdminList(): JSX.Element {
    return <span>Admin List</span>;
}
