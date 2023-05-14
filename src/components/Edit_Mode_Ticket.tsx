import React, { useState } from "react";
import { useEffect } from "react";
import { EnumStatus } from "../Interface/EnumStatus";
import { Ticket } from "./TicketItem";
import { Form } from "react-bootstrap";
import { UserRole } from "./NavigationBar";

export function EditTicket({
    ticket,
    currentUserRole,
    editListOwner
}: {
    ticket: Ticket;
    currentUserRole: UserRole;
    editListOwner: UserRole;
}): JSX.Element {
    //PART 1: HELPER function

    //function to convert status to string
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

    const initial_date = new Date();

    const [inEditMode, setInEditMode] = useState<boolean>(false);
    const [canEdit, setCanEdit] = useState<boolean>(false);
    const [ticketTitle, setTicketTitle] = useState<string>(ticket.title);
    const [ticketDescription, setTicketDescription] = useState<string>(
        ticket.description
    );
    const [ticketStatus, setTicketStatus] = useState<string>(
        statusToString(ticket.status)
    );
    const [ticketPriority, setTicketPriority] = useState<number>(
        ticket.priority
    );
    const [ticketLastModified, setTicketLastModified] =
        useState<Date>(initial_date);
    const [ticketImage, setTicketImage] = useState<string>(ticket.image_path);
    const [ticketAssignee, setTicketAssignee] = useState<string>(
        ticket.assignee
    );

    //PART 3: CONTROL functions

    const current_date = ticket.last_modified;

    //function to update EditMode
    function updateInEditMode(event: React.ChangeEvent<HTMLInputElement>) {
        setInEditMode(event.target.checked);
    }

    //function to update LastModified
    useEffect(() => setTicketLastModified(current_date), []);

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

    //PART 5: USER ROLE function

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

    //PART 6: IN EDIT MODE functions

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

    //PART 7: VIEW

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
