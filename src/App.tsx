import React from "react";
import "./App.css";
import { TicketButton } from "./components/TicketButton";
import { DropDownLogIn } from "./components/DropDownLogIn";
import { Preferences } from "./components/Preferences";
import { Ticket } from "./components/Ticket";
import { ViewMyWork } from "./components/ViewMyWork";

import { CentralListSection } from "./component/CentralSection";
import {User} from "./interface/User";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <h1>Team 3</h1>
                    <h4>
                        Galen Nare, Michael Arocho, Solenn Gacon, Nicholas
                        DiGirolamo, Andrew Roberts, Alexandra Croce
                    </h4>
                </div>
            </header>
            <hr></hr>
            <TicketButton></TicketButton>
            <hr></hr>
            <DropDownLogIn></DropDownLogIn>
            <hr></hr>
            <Preferences></Preferences>
            <hr></hr>
            <Ticket></Ticket>
            <hr></hr>
            <ViewMyWork></ViewMyWork>
            <hr></hr>
            <div>
                {CentralListSection("New", [
                    {
                        id: 1,
                        name: "Ticket 1",
                        description: "",
                        status: "New",
                        priority: 5,
                        last_modified: new Date(Date.now()),
                        previous_version: undefined,
                        image: "null",
                        author: undefined,
                        assignee: undefined
                    },
                    {
                        id: 2,
                        name: "Ticket 2",
                        description: "",
                        status: "New",
                        priority: 5,
                        last_modified: new Date(Date.now()),
                        previous_version: undefined,
                        image: "null",
                        author: undefined,
                        assignee: undefined
                    },
                    {
                        id: 3,
                        name: "Ticket 3",
                        description: "",
                        status: "New",
                        priority: 5,
                        last_modified: new Date(Date.now()),
                        previous_version: undefined,
                        image: "null",
                        author: undefined,
                        assignee: undefined
                    }
                ])}
            </div>
        </div>
    );
}

export default App;
