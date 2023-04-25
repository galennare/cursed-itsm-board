import React, { useState } from "react";
import "./App.css";
import { TicketButton } from "./components/TicketButton";
import { NavigationBar, UserRole } from "./components/NavigationBar";
import { Preferences } from "./components/Preferences";
import { RevealTicket } from "./components/RevealTicket";
import { ViewMyWork } from "./components/ViewMyWork";

function App() {
    const [userRole, setUserRole] = useState<UserRole>(UserRole.User);

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
                <NavigationBar
                    userRole={userRole}
                    setUserRole={setUserRole}
                ></NavigationBar>
                <Preferences></Preferences>
                <ViewMyWork></ViewMyWork>
            </span>
            <hr></hr>
            <h5>New Tickets</h5>
            <RevealTicket></RevealTicket>
            <hr></hr>
            <h5>In Progess</h5>
            <RevealTicket></RevealTicket>
            <hr></hr>
        </div>
    );
}

export default App;
