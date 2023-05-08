import React, { useEffect, useState } from "react";
import "./App.css";
import { TicketButton } from "./components/TicketButton";
import { NavigationBar, UserRole } from "./components/NavigationBar";
import { Preferences } from "./components/Preferences";
import { RevealTicket } from "./components/RevealTicket";
import { ViewMyWork } from "./components/ViewMyWork";
import { ProfilePhoto } from "./components/ProfilePhoto";
import { Ticket } from "./Interface/TicketInterface";
import { TicketList } from "./components/TicketList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "react-bootstrap";

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

function App() {
    const [userRole, setUserRole] = useState<UserRole>(UserRole.User);

    const [centralList, setCentralList] = useState<Ticket[]>(INITIAL_LIST);
    const [adminList, setAdminList] = useState<Ticket[]>([]);
    const [userList, setUserList] = useState<Ticket[]>([]);

    useEffect(() => {
        console.log("Admin:", adminList);
        console.log("User:", userList);
        console.log("Central:", centralList);
    });

    return (
        <div className="App">
            <DndProvider backend={HTML5Backend}>
                <header className="App-header">
                    <div>
                        <ProfilePhoto searcher="https://example.com/profile.jpg" />
                    </div>
                    <div>
                        <NavigationBar
                            userRole={userRole}
                            setUserRole={setUserRole}
                        ></NavigationBar>
                    </div>
                </header>
                <div style={{ backgroundColor: "#8096c06e" }}>
                    <div className="buttons">
                        <div>
                            <TicketButton></TicketButton>
                        </div>
                        <div>
                            <ViewMyWork></ViewMyWork>
                        </div>
                        <div style={{ paddingLeft: "915px" }}>
                            <Preferences></Preferences>
                        </div>
                    </div>
                </div>
                <h5>New Tickets</h5>
                <RevealTicket></RevealTicket>
                <hr></hr>
                <h5>In Progress</h5>
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
                        <h1>User List</h1>
                        <Button
                            onClick={() => {
                                setUserList([...userList, INITIAL_LIST[0]]);
                            }}
                        >
                            Add Element
                        </Button>
                        <TicketList
                            list={userList}
                            onDragOver={(item: Ticket) => {
                                console.log([...userList]);
                            }}
                            onDrop={(item: Ticket) => {
                                setUserList([...userList, item]);
                            }}
                        />
                    </div>
                    <div
                        className="column"
                        style={{ width: "33.33%", display: "table-cell" }}
                    >
                        <h1>Central List</h1>
                        <Button
                            onClick={() => {
                                setCentralList([
                                    ...centralList,
                                    INITIAL_LIST[0]
                                ]);
                            }}
                        >
                            Add Element
                        </Button>
                        <TicketList
                            list={centralList}
                            onDragOver={(item: Ticket) => {
                                console.log([...centralList]);
                            }}
                            onDrop={(item: Ticket) => {
                                setCentralList([...centralList, item]);
                            }}
                        />
                    </div>

                    <div
                        className="column"
                        style={{ width: "33.33%", display: "table-cell" }}
                    >
                        <h1>Admin List</h1>
                        <Button
                            onClick={() => {
                                setAdminList([...adminList, INITIAL_LIST[0]]);
                            }}
                        >
                            Add Element
                        </Button>
                        <TicketList
                            list={adminList}
                            onDragOver={(item: Ticket) => {
                                console.log([...adminList]);
                            }}
                            onDrop={(item: Ticket) => {
                                console.log([...adminList]);
                                setAdminList([...adminList, item]);
                            }}
                        />
                    </div>
                </div>
            </DndProvider>
        </div>
    );
}

export default App;
