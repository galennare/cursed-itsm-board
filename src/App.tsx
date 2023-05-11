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
import { UserSort } from "./components/UserSort";
import { v4 } from "uuid";
import { TicketCreator } from "./components/TicketCreator";
import { Button } from "react-bootstrap";

const INITIAL_LIST: Ticket[] = [
    {
        id: v4(),
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
        id: v4(),
        title: "My Phone Died",
        description: "This is the description for ticket two.",
        priority: 1,
        last_modified: new Date(),
        author: "Donald Trump",
        status: "In-Progress",
        assignee: "Nick DiGirolamo",
        image_path: "path_to_image"
    },
    {
        id: v4(),
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

export interface userProps {
    setUserRole: (newRole: UserRole) => void;
}

export interface centralProps {
    centralList: Ticket[];
    setCentralList: (newList: Ticket[]) => void;
}

function App() {
    const [userRole, setUserRole] = useState<UserRole>(UserRole.User);

    const [centralList, setCentralList] = useState<Ticket[]>(INITIAL_LIST);
    const [adminList, setAdminList] = useState<Ticket[]>([]);
    const [userList, setUserList] = useState<Ticket[]>([]);
    const centralTickets = [...centralList];

    const [revealCreator, setRevealCreator] = useState<boolean>(false);

    return (
        <div className="App">
            <DndProvider backend={HTML5Backend}>
                <header className="App-header">
                    <div>
                        <ProfilePhoto searcher="https://example.com/profile.jpg" />
                    </div>
                    <div>
                        <NavigationBar
                            setUserRole={setUserRole}
                            centralList={centralList}
                            setCentralList={setCentralList}
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
                        {userRole == UserRole.Super && (
                            <Button
                                onClick={() => setRevealCreator(!revealCreator)}
                            >
                                Toggle Ticket Creator
                            </Button>
                        )}
                        {revealCreator && (
                            <TicketCreator
                                list={centralList}
                                setList={setCentralList}
                            ></TicketCreator>
                        )}
                        <TicketList
                            title={"All Tickets"}
                            userRole={userRole}
                            requiredRole={UserRole.Super}
                            list={centralList}
                            setList={setCentralList}
                        />
                    </div>
                    <div
                        className="column"
                        style={{ width: "33.33%", display: "table-cell" }}
                    >
                        <TicketList
                            title={"My Tickets"}
                            userRole={userRole}
                            requiredRole={UserRole.User}
                            list={userList}
                            setList={setUserList}
                        />
                    </div>
                    <div
                        className="column"
                        style={{ width: "33.33%", display: "table-cell" }}
                    >
                        <TicketList
                            title={"Tickets For Review"}
                            userRole={userRole}
                            requiredRole={UserRole.Admin}
                            list={adminList}
                            setList={setAdminList}
                        />
                    </div>
                </div>
            </DndProvider>
        </div>
    );
}

export default App;
