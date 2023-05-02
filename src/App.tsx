import React, { useState } from "react";
import "./App.css";
import { TicketButton } from "./components/TicketButton";
import { NavigationBar, UserRole } from "./components/NavigationBar";
import { Preferences } from "./components/Preferences";
import { RevealTicket } from "./components/RevealTicket";
import { ViewMyWork } from "./components/ViewMyWork";
import { Hook, TicketDatabase } from "./TicketDatabase";
import { Ticket } from "./components/TicketItem";
import { TicketList } from "./components/TicketList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
    // userRole is the current role that the user has selected to act as
    const [userRole, setUserRole] = useState<UserRole>(UserRole.User);

    const INITIAL_LIST: Ticket[] = [
        {
            id: 1,
            title: "Computer Issues",
            description: "This is the description for ticket one.",
            priority: 0,
            last_modified: new Date(),
            author: "Joe Biden",
            status: "Pending",
            assignee: "Nick DiGirolamo",
            image_path: "path_to_image"
        },
        {
            id: 2,
            title: "My Phone Died",
            description: "This is the description for ticket two.",
            priority: 0,
            last_modified: new Date(),
            author: "Donald Trump",
            status: "In-Progress",
            assignee: "Nick DiGirolamo",
            image_path: "path_to_image"
        },
        {
            id: 3,
            title: "No WIFI?",
            description: "This is the description for ticket three.",
            priority: 0,
            last_modified: new Date(),
            author: "Barack Obama",
            status: "Resolved",
            assignee: "Nick DiGirolamo",
            image_path: "path_to_image"
        }
    ];

    // instantiate the ticket database
    // see TicketDatabase.ts for documentation
    const ticketDB = new TicketDatabase(INITIAL_LIST); // <-- comment this line back in when you use the ticket database

    return (
        <div className="App">
            <DndProvider backend={HTML5Backend}>
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

                <div
                    className="row"
                    style={{ width: "100%", display: "table" }}
                >
                    <div
                        className="column"
                        style={{ width: "33.33%", display: "table-cell" }}
                    >
                        <h1>Central List</h1>
                        <TicketList
                            ticketDB={ticketDB}
                            ticket_hooks={ticketDB.getCentralList()}
                            type={UserRole.Super}
                        ></TicketList>
                    </div>

                    <div
                        className="column"
                        style={{ width: "33.33%", display: "table-cell" }}
                    >
                        <h1>Admin List</h1>
                        <TicketList
                            ticketDB={ticketDB}
                            ticket_hooks={ticketDB.getAdminList()}
                            type={UserRole.Admin}
                        ></TicketList>
                    </div>

                    <div
                        className="column"
                        style={{ width: "33.33%", display: "table-cell" }}
                    >
                        <h1>User List</h1>
                        <TicketList
                            ticketDB={ticketDB}
                            ticket_hooks={ticketDB.getUserList(userRole)}
                            type={UserRole.User}
                        ></TicketList>
                    </div>
                </div>
            </DndProvider>
        </div>
    );
}

export default App;
