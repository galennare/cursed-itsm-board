import React from "react";
import "./App.css";
import { TicketButton } from "./components/TicketButton";
import { DropDownLogIn } from "./components/DropDownLogIn";
import { Preferences } from "./components/Preferences";
import { Ticket } from "./components/Ticket";
import { ViewMyWork } from "./components/ViewMyWork";

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
            <br></br>
            <span>
                <TicketButton></TicketButton>
                <DropDownLogIn></DropDownLogIn>
                <Preferences></Preferences>
                <ViewMyWork></ViewMyWork>
            </span>
            <hr></hr>
            <h5>New Tickets</h5>
            <Ticket></Ticket>
            <hr></hr>
            <h5>In Progess</h5>
            <Ticket></Ticket>
            <hr></hr>
            <h5>Assigned to me</h5>
            <Ticket></Ticket>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div>
    );
}

export default App;
