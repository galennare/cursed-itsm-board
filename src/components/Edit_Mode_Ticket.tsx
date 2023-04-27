import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Ticket } from "../interface/Ticket";
import { User } from "../interface/User";
import { EnumStatus } from "../interface/EnumStatus";

export function EditTicket({
    ticketData
}: {
    ticketData: Ticket;
}): JSX.Element {
    const current_version = ticketData;
    const current_assignee = ticketData.assignee;
    const current_date = new Date();

    //PART 1: HELPER functions
    function statusToString(myStatus: EnumStatus): string {
        if (myStatus === "New") {
            return "New";
        } else if (myStatus === "In Progress") {
            return "In Progress";
        } else {
            return "Resolved";
        }
    }

    //PART 2: STATE
    const [inEditMode, setInEditMode] = useState<boolean>(false);
    const [ticketTitle, setTicketTitle] = useState<string>(ticketData.name);
    const [ticketDescription, setTicketDescription] = useState<string>(
        ticketData.description
    );
    const [ticketStatus, setTicketStatus] = useState<string>(
        statusToString(ticketData.status)
    );
    const [ticketPriority, setTicketPriority] = useState<number>(
        ticketData.priority
    );
    const [ticketLastModified, setTicketLastModified] = useState<string>(
        ticketData.last_modified.toDateString()
    );
    const [ticketPreviousVersion, setTicketPreviousVersion] =
        useState<Ticket | null>(ticketData.previous_version);
    const [ticketImage, setTicketImage] = useState<string>(ticketData.image);
    const [ticketAssignee, setTicketAssignee] = useState<User | null>(
        ticketData.assignee
    );

    //PART 3: CONTROL functions
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

    //function to update the last modified field of the ticket
    function updateTicketLastModified() {
        setTicketLastModified(current_date.toDateString());
    }

    //function to update the previous version of the ticket
    function updateTicketPreviousVersion() {
        setTicketPreviousVersion(current_version);
    }

    //function to update the image of the ticket
    function updateTicketImage(event: React.ChangeEvent<HTMLInputElement>) {
        setTicketImage(event.target.value);
    }

    //function to update the assignee of the ticket
    function updateTicketAssignee() {
        setTicketAssignee(current_assignee);
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

    //PART 5: IN EDIT MODE functions
    function titleInEditMode(): JSX.Element {
        if (inEditMode === true) {
            return (
                <div>
                    <Form.Group controlId="formTicketTitle">
                        <Form.Label>Title:</Form.Label>
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
                        <Form.Label>Description:</Form.Label>
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
                        <Form.Label>Priority:</Form.Label>
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
                        <Form.Label>Image URL:</Form.Label>
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
                        <Form.Label>Ticket Status:</Form.Label>
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

    //PART 6: VIEW
    return (
        <div>
            <Form.Switch
                id="in-edit-mode"
                label="In Edit Mode?"
                checked={inEditMode}
                onChange={updateInEditMode}
            />
            <div>{titleInEditMode()}</div>
            <div>{descriptionInEditMode()}</div>
            <div>{priorityInEditMode()}</div>
            <div>{imageInEditMode()}</div>
            <div>{statusInEditMode()}</div>
        </div>
    );
}
