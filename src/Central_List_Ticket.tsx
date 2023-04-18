import React, { useState } from 'react';
import { Button } from "react-bootstrap";

export function RepresentTicket(): JSX.Element {
    //Button to edit, button to copy, button to create new textbox

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
