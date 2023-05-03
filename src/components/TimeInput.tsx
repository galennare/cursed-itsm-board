import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

interface TimeInputProps {
    expectedTime?: number;
    actualTime?: number;
    onSave?: (expectedTime: number, actualTime: number) => void;
}

export function TimeInput(props: TimeInputProps): JSX.Element {
    const {
        expectedTime = 0,
        actualTime = 0,
        onSave = () => {
            return;
        }
    } = props;

    // Component state
    const [isEditing, setIsEditing] = useState(false);
    const [expectedTimeValue, setExpectedTimeValue] = useState(
        expectedTime.toString()
    );
    const [actualTimeValue, setActualTimeValue] = useState(
        actualTime.toString()
    );

    /**
     * Function to handle exiting "edit mode" for time fields.
     * This triggers the props::onSave function after parsing the input fields.
     */
    const handleSave = () => {
        const expectedTimeNumber = parseFloat(expectedTimeValue);
        const actualTimeNumber = parseFloat(actualTimeValue);

        if (!isNaN(expectedTimeNumber) && !isNaN(actualTimeNumber)) {
            onSave(expectedTimeNumber, actualTimeNumber);
            setIsEditing(false);
        }
    };

    return (
        <Form>
            <Form.Group controlId="formExpectedTime">
                <Form.Label>Expected hours: </Form.Label>
                <Form.Control
                    type="number"
                    step="0.1"
                    placeholder="Enter expected time"
                    value={expectedTimeValue}
                    onChange={(e) => setExpectedTimeValue(e.target.value)}
                    disabled={!isEditing}
                />
            </Form.Group>
            <Form.Group controlId="formActualTime">
                <Form.Label>Actual hours: </Form.Label>
                <Form.Control
                    type="number"
                    step="0.1"
                    placeholder="Enter actual time"
                    value={actualTimeValue}
                    onChange={(e) => setActualTimeValue(e.target.value)}
                    disabled={!isEditing}
                />
            </Form.Group>

            {/* Change button based on edit mode state */}
            {isEditing ? (
                <Button variant="primary" onClick={handleSave}>
                    Save
                </Button>
            ) : (
                <Button variant="secondary" onClick={() => setIsEditing(true)}>
                    Edit
                </Button>
            )}
        </Form>
    );
}
