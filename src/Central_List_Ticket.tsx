import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

export type StatusType = "pending" | "in progress" | "resolved";

export interface Ticket {
    /** A unique identifier for the ticket */
    id: number;
    /** The human-friendly title of the ticket */
    name: string;
    /** The instructions and content of the ticket */
    descritpion: string;
    /** The status of the ticket indicating whether it has been resolved or not */
    status: StatusType;
    /** The priority of the ticket */
    priority: number;
    /** When the ticket was last modified */
    last_modified: Date;
    /** The previous version of the ticket */
    previous_version: null;
    /** An image representing the ticket */
    image: string;
    /** The author of the ticket */
    author: User;
    /** The assignee/resolver of the ticket */
    assignee: User;
}

export interface User {
    /** the username of the user */
    username: string;
    /** the name of the user */
    name: string;
    /** the image of the user */
    image: string;
    /** the ticket list of the user */
    ticket_list: JSX.Element[];
}

export function RepresentTicket(): JSX.Element {
    //Button to edit, button to copy, button to create new textbox

    //This is State
    const [ticketTitle, setTicketTitle] = useState<string>("Untitled");
    const [ticketDescription, setTicketDescription] =
        useState<string>("No description.");
    const [ticketStatus, setTicketStatus] = useState<StatusType>("pending");
    const [ticketPriority, setTicketPriority] = useState<number>(0);
    //const [ticketLastModified, setTicketLastModified] = useState<Date>();
    //const [ticketPreviousVersion, setTicketPreviousVersion] = useState<JSX.Element>();
    const [ticketImage, setTicketImage] = useState<string>("");
    //const [ticketAssignee, setTicketAssignee] = useState<User>();

    //This is Control
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
    /*function updateTicketStatus(event: React.ChangeEvent<HTMLInputElement>) {
        setTicketStatus(event.target.value);
    }*/

    //function to update the priority of the ticket
    /*function updateTicketPriority(event: React.ChangeEvent<HTMLInputElement>) {
        setTicketPriority(event.target.value);
    }*/

    //function to update the last modified field of the ticket

    //function to update the previous version of the ticket

    function updateTicketImage(event: React.ChangeEvent<HTMLInputElement>) {
        setTicketImage(event.target.value);
    }

    //function to update the assignee of the ticket
}

export function RevealAnswer(): JSX.Element {
    const [visible, setVisible] = useState<boolean>(false);

    function flipVisibility(): void {
        setVisible(!visible);
    }

    return (
        <div>
            <Button onClick={flipVisibility}>Reveal Answer</Button>
            {visible && <div>42</div>}
        </div>
    );
}

export function EditMode(): JSX.Element {
    //This is State
    const [inEditMode, setInEditMode] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>("Your Name");
    const [isStudent, setIsStudent] = useState<boolean>(true);

    //This is Control
    function updateInEditMode(event: React.ChangeEvent<HTMLInputElement>) {
        setInEditMode(event.target.checked);
    }

    function updateUserName(event: React.ChangeEvent<HTMLInputElement>) {
        setUserName(event.target.value);
    }

    function updateIsStudent(event: React.ChangeEvent<HTMLInputElement>) {
        setIsStudent(event.target.checked);
    }

    function textNotInEditMode(): string {
        if (isStudent === true) {
            return userName + " is a student";
        } else {
            return userName + " is not a student";
        }
    }

    function textInEditMode(): JSX.Element {
        if (inEditMode === true) {
            return (
                <div>
                    <Form.Check
                        type="checkbox"
                        id="is-student-check"
                        label="Student?"
                        checked={isStudent}
                        onChange={updateIsStudent}
                    />
                    <Form.Group controlId="formStudentName">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            value={userName}
                            onChange={updateUserName}
                        />
                    </Form.Group>
                </div>
            );
        } else {
            return <p>{textNotInEditMode()}</p>;
        }
    }

    //This is View
    return (
        <div>
            <Form.Switch
                id="in-edit-mode"
                label="In Edit Mode?"
                checked={inEditMode}
                onChange={updateInEditMode}
            />
            <div>{textInEditMode()}</div>
        </div>
    );
}
