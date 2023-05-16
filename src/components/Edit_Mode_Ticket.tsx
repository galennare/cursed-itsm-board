import React, { useState } from "react";
import { useEffect } from "react";
import { EnumStatus } from "../Interface/EnumStatus";
import { Ticket } from "./TicketItem";
import { Form } from "react-bootstrap";
import { UserRole } from "./NavigationBar";

//HELPER functions

export function statusToString(myStatus: EnumStatus): string {
    if (myStatus === "Pending") {
        return "Pending";
    } else if (myStatus === "In-Progress") {
        return "In-Progress";
    } else {
        return "Resolved";
    }
}

export function convertToPriority(value: number): 0 | 1 | 2 | 3 | 4 | 5 {
    value = value < 0 ? 0 : 5 < value ? 5 : value;
    let priorityValue: 0 | 1 | 2 | 3 | 4 | 5 = 0;
    priorityValue = value == 0 ? 0 : value == 1 ? 1 : priorityValue;
    priorityValue = value == 2 ? 2 : value == 3 ? 3 : priorityValue;
    priorityValue = value == 4 ? 4 : value == 5 ? 5 : priorityValue;
    return priorityValue;
}

//EDITMODE implementation

export function EditTicket({
    ticket,
    currentUserRole,
    editListOwner
}: {
    ticket: Ticket;
    currentUserRole: UserRole;
    editListOwner: UserRole;
}): JSX.Element {
    //PART 1: STATE

    const initial_date = new Date();
    const priorityValues = [0, 1, 2, 3, 4, 5];

    const [inEditMode, setInEditMode] = useState<boolean>(false);
    const [ticketTitle, setTicketTitle] = useState<string>(ticket.title);
    const [ticketDescription, setTicketDescription] = useState<string>(
        ticket.description
    );
    const [ticketStatus, setTicketStatus] = useState<string>(
        statusToString(ticket.status)
    );
    const [ticketPriority, setTicketPriority] = useState<0 | 1 | 2 | 3 | 4 | 5>(
        ticket.priority
    );
    const [ticketLastModified, setTicketLastModified] =
        useState<Date>(initial_date);
    const [ticketImage, setTicketImage] = useState<string>(ticket.image_path);
    const [ticketAssignee, setTicketAssignee] = useState<string>(
        ticket.assignee
    );

    //PART 2: CONTROL functions

    const current_date = ticket.last_modified;

    function updateInEditMode(event: React.ChangeEvent<HTMLInputElement>) {
        setInEditMode(event.target.checked);
    }

    function updateTicketTitle(event: React.ChangeEvent<HTMLInputElement>) {
        setTicketTitle(event.target.value);
    }

    function updateTicketDescription(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        setTicketDescription(event.target.value);
    }

    function updateTicketStatus(event: React.ChangeEvent<HTMLSelectElement>) {
        setTicketStatus(event.target.value);
    }

    function updateTicketPriority(event: React.ChangeEvent<HTMLSelectElement>) {
        setTicketPriority(convertToPriority(parseInt(event.target.value)));
    }

    useEffect(() => setTicketLastModified(current_date), []);

    function updateTicketImage(event: React.ChangeEvent<HTMLInputElement>) {
        setTicketImage(event.target.value);
    }

    function updateTicketAssignee(event: React.ChangeEvent<HTMLInputElement>) {
        setTicketAssignee(event.target.value);
    }

    //PART 3: NOT IN EDIT MODE functions

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

    //PART 4: USER ROLE function

    function userRoleEdit(): boolean {
        if (
            (currentUserRole === UserRole.Admin ||
                currentUserRole === UserRole.User) &&
            editListOwner === UserRole.Super
        ) {
            return false;
        } else if (
            currentUserRole === UserRole.User &&
            editListOwner === UserRole.Admin
        ) {
            return false;
        } else if (
            (currentUserRole === UserRole.Super ||
                currentUserRole === UserRole.Admin) &&
            editListOwner === UserRole.User
        ) {
            return false;
        } else {
            return true;
        }
    }

    //PART 5: IN EDIT MODE functions

    function titleInEditMode(): JSX.Element {
        if (inEditMode === true && userRoleEdit() === true) {
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
        if (inEditMode === true && userRoleEdit() === true) {
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
        if (inEditMode === true && userRoleEdit() === true) {
            return (
                <div>
                    <Form.Group controlId="formTicketPriority">
                        <Form.Label></Form.Label>
                        <Form.Select
                            value={ticketPriority}
                            onChange={updateTicketPriority}
                        >
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </Form.Select>
                    </Form.Group>
                    <div>{ticketPriority}</div>
                </div>
            );
        } else {
            return <p>{priorityNotInEditMode()}</p>;
        }
    }

    function imageInEditMode(): JSX.Element {
        if (inEditMode === true && userRoleEdit() === true) {
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
        if (inEditMode === true && userRoleEdit() === true) {
            return (
                <div>
                    <Form.Group controlId="ticketStatus">
                        <Form.Label></Form.Label>
                        <Form.Select
                            value={ticketStatus}
                            onChange={updateTicketStatus}
                        >
                            <option value="Pending">Pending</option>
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
        if (inEditMode === true && userRoleEdit() === true) {
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
            <Form.Check
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
