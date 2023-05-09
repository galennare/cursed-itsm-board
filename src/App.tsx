import React, { useCallback, useState } from "react";
import "./App.css";
import { TicketButton } from "./components/TicketButton";
import { NavigationBar, UserRole } from "./components/NavigationBar";
import { Preferences } from "./components/Preferences";
import { ViewMyWork } from "./components/ViewMyWork";
import { ProfilePhoto } from "./components/ProfilePhoto";
import { Ticket } from "./Interface/TicketInterface";
import { TicketList } from "./components/TicketList";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
    const [role, setRole] = useState<UserRole>(UserRole.User);

    const [centralList, setCentralList] = useState<Ticket[]>(INITIAL_LIST);
    const [adminList, setAdminList] = useState<Ticket[]>([]);
    const [userList, setUserList] = useState<Ticket[]>([]);

    return (
        <div className="App">
            <DndProvider backend={HTML5Backend}>
                <header className="App-header">
                    <div>
                        <ProfilePhoto searcher="https://example.com/profile.jpg" />
                    </div>
                    <div>
                        <NavigationBar
                            role={role}
                            setRole={setRole}
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

                <div
                    className="row"
                    style={{ width: "100%", display: "table" }}
                >
                    <div
                        className="column"
                        style={{ width: "33.33%", display: "table-cell" }}
                    >
                        <TicketList
                            title={"My Tickets"}
                            list={userList}
                            setList={setUserList}
                        />
                    </div>
                    <div
                        className="column"
                        style={{ width: "33.33%", display: "table-cell" }}
                    >
                        <TicketList
                            title={"Available Tickets"}
                            list={centralList}
                            setList={setCentralList}
                        />
                    </div>

                    <div
                        className="column"
                        style={{ width: "33.33%", display: "table-cell" }}
                    >
                        {(role == UserRole.Admin || role == UserRole.Super) && (
                            <TicketList
                                title={"Tickets for Review"}
                                list={adminList}
                                setList={setAdminList}
                            />
                        )}
                    </div>
                </div>
            </DndProvider>
        </div>
    );
}

export default App;
