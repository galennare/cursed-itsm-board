import React from "react";
import "./App.css";
import { TicketButton } from "./components/TicketButton";
import { DropDownLogIn } from "./components/DropDownLogIn";
import { Preferences } from "./components/Preferences";
import { Ticket } from "./components/Ticket";
import { ViewMyWork } from "./components/ViewMyWork";

import { CentralListSection } from "./component/CentralSection";

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
                    "Ticket 1",
                    "Ticket 2",
                    "Ticket 3"
                ])}
            </div>
            <div>
                {CentralListSection("In Progress", [
                    "Ticket 1",
                    "Ticket 2",
                    "Ticket 3"
                ])}
            </div>
            <div>
                {CentralListSection("Resolved", [
                    "Ticket 1",
                    "Ticket 2",
                    "Ticket 3"
                ])}
            </div>
        </div>
    );
}

export default App;
