import React, { useState } from 'react';
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

export type StatusType = "pending" | "in progress" | "resolved";

export function RepresentTicket(): JSX.Element {
    //Button to edit, button to copy, button to create new textbox

    //This is State
    const[ticketTitle, setTicketTitle] = useState<string>("Untitled");
    const[ticketDescription, setTicketDescription] = useState<string>("No description.");
    const[ticketStatus, setTicketStatus] = useState<StatusType>("pending");
    const[ticketPriority, setTicketPriority] = useState<number>(0);
    const [ticketLastModified, setTicketLastModified] = useState<Date>();
    
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

