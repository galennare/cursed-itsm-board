import React from "react";
import { Hook } from "../TicketDatabase";
import { useDrag } from "react-dnd";

/*
    THIS IS NOT A UI COMPONENT. This interface defines our data structure 
    for a single ticket. This is NOT a UI component but rather a declaration
    of the properties that exist on a Ticket instance.

    IMPORTANT: If you want to have a variable of type Ticket anywhere else
    in the program you MUST import the interface for it from this file!
    Trying to create an object with the same properties is NOT sufficient
    so the variable must be declared with a type of Ticket or TypeScript
    will get mad!
*/
export interface Ticket {
    id: number;
    title: string;
    description: string;
    priority: 0 | 1 | 2 | 3 | 4 | 5;
    last_modified: Date;
    author: string;
    status: "New" | "In-Progress" | "Resolved";
    assignee: string;
    image_path: string;
}

/*
    KEY PART OF MVP #########################################################

    This is the JSX UI component of a ticket that will be rendered in lists.
    For the MVP this component takes 1 parameter of a Ticket instance and
    renders the relevant contnent such as title, description, author, etc.
    in a visually pleasing manor.

    This component does NOT feature a button/toggle to show/hide the data it
    contains.

    #########################################################################

    In later revisions of this component we will change any text fields such
    as the title and description to be text inputs so that a user such as
    the admin or super can edit a ticket if they would like. As such, we will
    eventually need to make this component accept more parameters such as
    an update hook/function that actually changes the ticket data in the
    object when the user makes a change.

    Additionally we may need to pass parameters indicating what list this
    component is being rendered within (central/admin/user) and who the
    current user is in order to determine whether the text fields should be
    editable.
 */
export function TicketItem({
    ticket_hook
}: {
    ticket_hook: Hook<Ticket>;
}): JSX.Element {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "TicketItem",
        item: ticket_hook,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            ticket: monitor.getItem()
        })
    }));

    return (
        <div
            role="ticket_item"
            key={ticket_hook[0].id}
            ref={drag}
            style={{
                border: "5px solid black",
                margin: "10px",
                flex: "0 0 auto"
            }}
        >
            <h1>{ticket_hook[0].title}</h1>
            <h4>Author: {ticket_hook[0].author}</h4>
            <h4> Assigned To: {ticket_hook[0].assignee}</h4>
            <div>
                Status: {ticket_hook[0].status}
                Priority: {ticket_hook[0].priority}
            </div>
            <p>{ticket_hook[0].description}</p>
        </div>
    );
}
