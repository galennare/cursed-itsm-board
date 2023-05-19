import { Button, Form } from "react-bootstrap";
import { Ticket } from "../Interface/TicketInterface";
import React, { useState } from "react";
import { v4 } from "uuid";

export function CreateTicket(
    title: string,
    description: string,
    priority: 0 | 1 | 2 | 3 | 4 | 5,
    author: string,
    assignee: string
): Ticket {
    const newTicket: Ticket = {
        id: v4(),
        title: title,
        description: description,
        priority: priority,
        last_modified: new Date(),
        author: author,
        status: "Pending",
        assignee: assignee,
        image_path: "path_to_image"
    };
    return newTicket;
}

export function convertToPriority(value: number): 0 | 1 | 2 | 3 | 4 | 5 {
    value = value < 0 ? 0 : 5 < value ? 5 : value;
    let priorityValue: 0 | 1 | 2 | 3 | 4 | 5 = 0;
    priorityValue = value == 0 ? 0 : value == 1 ? 1 : priorityValue;
    priorityValue = value == 2 ? 2 : value == 3 ? 3 : priorityValue;
    priorityValue = value == 4 ? 4 : value == 5 ? 5 : priorityValue;
    return priorityValue;
}

export function TicketCreator({
    list,
    setList
}: {
    list: Ticket[];
    setList: (list: Ticket[]) => void;
}) {
    const [title, setTitle] = useState<string>("");
    /* istanbul ignore next */
    function updateTitle(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    }

    const [description, setDescription] = useState<string>("");
    /* istanbul ignore next */
    function updateDescription(event: React.ChangeEvent<HTMLInputElement>) {
        setDescription(event.target.value);
    }

    const priorityValues = [0, 1, 2, 3, 4, 5];
    const [priority, setPriority] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);
    /* istanbul ignore next */
    function updatePriority(event: React.ChangeEvent<HTMLSelectElement>) {
        setPriority(convertToPriority(parseInt(event.target.value)));
    }

    const [author, setAuthor] = useState<string>("");
    /* istanbul ignore next */
    function updateAuthor(event: React.ChangeEvent<HTMLInputElement>) {
        setAuthor(event.target.value);
    }

    const [assignee, setAssignee] = useState<string>("");
    /* istanbul ignore next */
    function updateAssignee(event: React.ChangeEvent<HTMLInputElement>) {
        setAssignee(event.target.value);
    }

    return (
        <div role={"ticket_creator"}>
            <Form.Group controlId="formTitle">
                <Form.Label>Title: </Form.Label>
                <Form.Control value={title} onChange={updateTitle} />
            </Form.Group>

            <Form.Group controlId="formDescription">
                <Form.Label>Description: </Form.Label>
                <Form.Control
                    value={description}
                    onChange={updateDescription}
                />
            </Form.Group>

            <Form.Group controlId="formPriority">
                <Form.Label>Priority: </Form.Label>
                <Form.Select value={priority} onChange={updatePriority}>
                    {priorityValues.map((priority: number) => (
                        <option key={priority} value={priority}>
                            {priority}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form.Group controlId="formAuthor">
                <Form.Label>Author: </Form.Label>
                <Form.Control value={author} onChange={updateAuthor} />
            </Form.Group>

            <Form.Group controlId="formAssignee">
                <Form.Label>Assignee: </Form.Label>
                <Form.Control value={assignee} onChange={updateAssignee} />
            </Form.Group>

            <Button
                onClick={() =>
                    setList([
                        ...list,
                        CreateTicket(
                            title,
                            description,
                            priority,
                            author,
                            assignee
                        )
                    ])
                }
            >
                Add Ticket
            </Button>
        </div>
    );
}
