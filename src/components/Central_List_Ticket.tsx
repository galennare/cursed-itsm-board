import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Ticket } from "../interface/Ticket";
import { User } from "../interface/User";

export type StatusType = "pending" | "in progress" | "resolved";

export function RepresentTicket(): JSX.Element {
    //Note: Button to edit, button to copy, button to create new textbox
    const current_date = new Date();

    //STATE
    const [inEditMode, setInEditMode] = useState<boolean>(false);
    const [ticketTitle, setTicketTitle] = useState<string>("");
    const [ticketDescription, setTicketDescription] = useState<string>("");
    const [ticketStatus, setTicketStatus] = useState<StatusType>("pending");
    const [ticketPriority, setTicketPriority] = useState<number>(0);
    const [ticketLastModified, setTicketLastModified] =
        useState<Date>(current_date);
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
    /*function updateTicketStatus(event: React.ChangeEvent<HTMLInputElement>) {
        setTicketStatus(event.target.value);
    }*/

    //function to update the priority of the ticket
    function updateTicketPriority(event: React.ChangeEvent<HTMLInputElement>) {
        setTicketPriority(parseInt(event.target.value));
    }

    //function to update the last modified field of the ticket
    /*function updateTicketLastModified(event: React.ChangeEvent<HTMLInputElement>) {
        setTicketLastModified(event.target.value);
    }*/

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

    function lastModifiedNotInEditMode(): Date {
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
                    <Form.Group controlId="formTitleName">
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
