import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Ticket } from "../interface/Ticket";
import { User } from "../interface/User";

export type StatusType = "pending" | "in progress" | "resolved";

export function RepresentTicket(): JSX.Element {
    const current_date = new Date();
    const current_date_string = current_date.toLocaleString();

    //STATE
    const [inEditMode, setInEditMode] = useState<boolean>(false);
    const [ticketTitle, setTicketTitle] = useState<string>("");
    const [ticketDescription, setTicketDescription] = useState<string>("");
    const [ticketStatus, setTicketStatus] = useState<StatusType>("pending");
    const [ticketPriority, setTicketPriority] = useState<number>(0);
    const [ticketLastModified, setTicketLastModified] =
        useState<string>(current_date_string);
    const [ticketPreviousVersion, setTicketPreviousVersion] =
        useState<Ticket | null>(null);
    const [ticketImage, setTicketImage] = useState<string>("");
    const [ticketAssignee, setTicketAssignee] = useState<User>({
        username: "",
        name: "",
        image: "",
        ticket_list: []
    });

    //CONTROL functions
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
    /*function updateTicketStatus(event: React.ChangeEvent<HTMLSelectElement>) {
        setTicketStatus(event.target.value);
    }*/

    //function to update the priority of the ticket
    function updateTicketPriority(event: React.ChangeEvent<HTMLInputElement>) {
        setTicketPriority(parseInt(event.target.value));
    }

    //function to update the last modified field of the ticket
    function updateTicketLastModified(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        setTicketLastModified(event.target.value);
    }

    //function to update the previous version of the ticket
    /*function updateTicketPreviousVersion(event: React.ChangeEvent<HTMLInputElement>) {
        setTicketPreviousVersion(event.target.value);
    }*/

    function updateTicketImage(event: React.ChangeEvent<HTMLInputElement>) {
        setTicketImage(event.target.value);
    }

    //function to update the assignee of the ticket
    /*function updateTicketAssignee(event: React.ChangeEvent<HTMLInputElement>) {
        setTicketAssignee(event.target.value);
    }*/

    //NOT IN EDIT MODE functions
    function titleNotInEditMode(): string {
        return ticketTitle;
    }

    function descriptionNotInEditMode(): string {
        return ticketDescription;
    }

    function statusNotInEditMode(): StatusType {
        return ticketStatus;
    }

    function priorityNotInEditMode(): number {
        return ticketPriority;
    }

    function imageNotInEditMode(): string {
        return ticketImage;
    }

    function lastModifiedNotInEditMode(): string {
        return ticketLastModified;
    }

    function assigneeNotInEditMode(): User {
        return ticketAssignee;
    }

    //IN EDIT MODE functions
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

    /*function statusInEditMode(): JSX.Element {
        if (inEditMode === true) {
            return (
                <div>
                    <Form.Group controlId="ticketStatus">
                        <Form.Label>Ticket Status</Form.Label>
                        <Form.Select
                            value={ticketStatus}
                            onChange={updateTicketStatus}
                        >
                            <option value="pending">Pending</option>
                            <option value="in progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                        </Form.Select>
                    </Form.Group>
                    <div>{ticketStatus}</div>
                </div>
            );
        } else {
            return <p>{statusNotInEditMode()}</p>;
        }
    }*/

    //VIEW
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
            <div>{/*statusInEditMode()*/}</div>
        </div>
    );
}