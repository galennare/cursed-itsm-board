import React, { useState } from "react";
import "./App.css";
import { TicketButton } from "./components/TicketButton";
import { NavigationBar, UserRole } from "./components/NavigationBar";
import { Preferences } from "./components/Preferences";
import { RevealTicket } from "./components/RevealTicket";
import { ViewMyWork } from "./components/ViewMyWork";
import { AdminList } from "./components/AdminList";
import { TicketDatabase } from "./TicketDatabase";

function App() {
    // userRole is the current role that the user has selected to act as
    const [userRole, setUserRole] = useState<UserRole>(UserRole.User);

    // instantiate the ticket database
    // see TicketDatabase.ts for documentation
    //const ticketDB = new TicketDatabase(); // <-- comment this line back in when you use the ticket database

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
            <h5>Assigned to me</h5>
            <RevealTicket></RevealTicket>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <div className="row">
                <div className="column" style={{ float: "left", width: "33%" }}>
                    <h1>Central List</h1>
                </div>
                <AdminList></AdminList>
                <div className="column" style={{ float: "left", width: "33%" }}>
                    <h1>User List</h1>
                </div>
            </div>
        </div>
    );
}

export default App;
