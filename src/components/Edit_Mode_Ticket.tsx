import React, { useState } from "react";
import { useEffect } from "react";
import { EnumStatus } from "../interface/EnumStatus";
import { Ticket } from "./TicketItem";
import { Form } from "react-bootstrap";
import { Hook } from "../TicketDatabase";

export function EditTicket({ ticket }: { ticket: Hook<Ticket> }): JSX.Element {
    const initial_date = new Date();

    //PART 1: HELPER functions
    function statusToString(myStatus: EnumStatus): string {
        if (myStatus === "Pending") {
            return "Pending";
        } else if (myStatus === "In-Progress") {
            return "In-Progress";
        } else {
            return "Resolved";
        }
    }

    //PART 2: STATE
    const [inEditMode, setInEditMode] = useState<boolean>(false);
    const [ticketData] = ticket;
    const [ticketTitle, setTicketTitle] = useState<string>(ticketData.title);
    const [ticketDescription, setTicketDescription] = useState<string>(
        ticketData.description
    );
    const [ticketStatus, setTicketStatus] = useState<string>(
        statusToString(ticketData.status)
    );
    const [ticketPriority, setTicketPriority] = useState<number>(
        ticketData.priority
    );
    const [ticketLastModified, setTicketLastModified] =
        useState<Date>(initial_date);
    const [ticketImage, setTicketImage] = useState<string>(
        ticketData.image_path
    );
    const [ticketAssignee, setTicketAssignee] = useState<string>(
        ticketData.assignee
    );

    const current_date = ticketData.last_modified;

    //PART 3: CONTROL functions
    useEffect(() => setTicketLastModified(current_date), []);

    //function to update EditMode
    function updateInEditMode(event: React.ChangeEvent<HTMLInputElement>) {
        setInEditMode(event.target.checked);
    }

    //function to update the title of the ticket
    function updateTicketTitle(event: React.ChangeEvent<HTMLInputElement>) {
        setTicketTitle(event.target.value);
    }

    //function to update the description of the ticket
    function updateTicketDescription(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        setTicketDescription(event.target.value);
    }

    //function to update the status of the ticket
    function updateTicketStatus(event: React.ChangeEvent<HTMLSelectElement>) {
        setTicketStatus(event.target.value);
    }

    //function to update the priority of the ticket
    function updateTicketPriority(event: React.ChangeEvent<HTMLInputElement>) {
        setTicketPriority(parseInt(event.target.value));
    }

    //function to update the image of the ticket
    function updateTicketImage(event: React.ChangeEvent<HTMLInputElement>) {
        setTicketImage(event.target.value);
    }

    //function to update the assignee of the ticket
    function updateTicketAssignee(event: React.ChangeEvent<HTMLInputElement>) {
        setTicketAssignee(event.target.value);
    }

    //PART 4: NOT IN EDIT MODE functions
    function titleNotInEditMode(): string {
        return ticketTitle;
    }

    function descriptionNotInEditMode(): string {
        return ticketDescription;
    }

    function statusNotInEditMode(): string {
        return ticketStatus;
    }

    function priorityNotInEditMode(): number {
        return ticketPriority;
    }

    function imageNotInEditMode(): string {
        return ticketImage;
    }

    function assigneeNotInEditMode(): string {
        return ticketAssignee;
    }

    function lastModifiedNotInEditMode(): string {
        return ticketLastModified.toDateString();
    }

    //PART 5: IN EDIT MODE functions
    function titleInEditMode(): JSX.Element {
        if (inEditMode === true) {
            return (
                <div>
                    <Form.Group controlId="formTicketTitle">
                        <Form.Label></Form.Label>
                        <Form.Control
                            value={ticketTitle}
                            onChange={updateTicketTitle}
                        />
                    </Form.Group>
                    <div>{ticketTitle}</div>
                </div>
            );
        } else {
            return <p>{titleNotInEditMode()}</p>;
        }
    }

    function descriptionInEditMode(): JSX.Element {
        if (inEditMode === true) {
            return (
                <div>
                    <Form.Group controlId="formTicketDescription">
                        <Form.Label></Form.Label>
                        <Form.Control
                            as="textarea"
                            //rows={3}
                            value={ticketDescription}
                            onChange={updateTicketDescription}
                        />
                    </Form.Group>
                    <div>{ticketDescription}</div>
                </div>
            );
        } else {
            return <p>{descriptionNotInEditMode()}</p>;
        }
    }

    function priorityInEditMode(): JSX.Element {
        if (inEditMode === true) {
            return (
                <div>
                    <Form.Group controlId="formTicketPriority">
                        <Form.Label></Form.Label>
                        <Form.Control
                            type="number"
                            value={ticketPriority}
                            onChange={updateTicketPriority}
                        />
                    </Form.Group>
                    <div>{ticketPriority}</div>
                </div>
            );
        } else {
            return <p>{priorityNotInEditMode()}</p>;
        }
    }

    function imageInEditMode(): JSX.Element {
        if (inEditMode === true) {
            return (
                <div>
                    <Form.Group controlId="formTicketImage">
                        <Form.Label></Form.Label>
                        <Form.Control
                            value={ticketImage}
                            onChange={updateTicketImage}
                        />
                    </Form.Group>
                    <div>{ticketImage}</div>
                </div>
            );
        } else {
            return <p>{imageNotInEditMode()}</p>;
        }
    }

    function statusInEditMode(): JSX.Element {
        if (inEditMode === true) {
            return (
                <div>
                    <Form.Group controlId="ticketStatus">
                        <Form.Label></Form.Label>
                        <Form.Select
                            value={ticketStatus}
                            onChange={updateTicketStatus}
                        >
                            <option value="New">New</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                        </Form.Select>
                    </Form.Group>
                    <div>{ticketStatus}</div>
                </div>
            );
        } else {
            return <p>{statusNotInEditMode()}</p>;
        }
    }

    function assigneeInEditMode(): JSX.Element {
        if (inEditMode === true) {
            return (
                <div>
                    <Form.Group controlId="formTicketAssignee">
                        <Form.Label></Form.Label>
                        <Form.Control
                            value={ticketAssignee}
                            onChange={updateTicketAssignee}
                        />
                    </Form.Group>
                    <div>{ticketAssignee}</div>
                </div>
            );
        } else {
            return <p>{assigneeNotInEditMode()}</p>;
        }
    }

    //PART 6: VIEW
    return (
        <div>
            <Form.Switch
                id="in-edit-mode"
                label="In Edit Mode?"
                checked={inEditMode}
                onChange={updateInEditMode}
            />
            <div>Title: {titleInEditMode()}</div>
            <div>Description: {descriptionInEditMode()}</div>
            <div>Priority: {priorityInEditMode()}</div>
            <div>Image: {imageInEditMode()}</div>
            <div>Status: {statusInEditMode()}</div>
            <div>Lastly edited on: {lastModifiedNotInEditMode()}</div>
            <div>Assignee: {assigneeInEditMode()}</div>
        </div>
    );
}
